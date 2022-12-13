//
//  Network.swift
//  MonsterMaker
//
//  Created by Hao Fu on 5/11/2022.
//

import Foundation
import Moya

class Network {
    static func request<T: Decodable, U: TargetType>(_ target: U, decoder: JSONDecoder = JSONDecoder()) async throws -> T {
        let provider = MoyaProvider<U>(plugins: [NetworkLoggerPlugin(configuration: .init(logOptions: .verbose))])
        let result = await provider.asyncRequest(target)
        switch result {
        case let .success(response):
            do {
                let filterdResponse = try response.filterSuccessfulStatusCodes()
                let model = try decoder.decode(T.self, from: filterdResponse.data)
                return model
            } catch {
                throw error
            }
        case let .failure(error):
            throw error
        }
    }
}

internal class AsyncMoyaRequestWrapper {
    var performRequest: (CheckedContinuation<Result<Response, MoyaError>, Never>) -> Moya.Cancellable?
    var cancellable: Moya.Cancellable?

    init(_ performRequest: @escaping (CheckedContinuation<Result<Response, MoyaError>, Never>) -> Moya.Cancellable?) {
        self.performRequest = performRequest
    }

    func perform(continuation: CheckedContinuation<Result<Response, MoyaError>, Never>) {
        cancellable = performRequest(continuation)
    }

    func cancel() {
        cancellable?.cancel()
    }
}

public extension MoyaProvider {
    /// Async request
    /// - Parameter target: Entity, with provides Moya.Target protocol
    /// - Returns: Result type with response and error
    func asyncRequest(_ target: Target) async -> Result<Response, MoyaError> {
        let asyncRequestWrapper = AsyncMoyaRequestWrapper { [weak self] continuation in
            guard let self = self else { return nil }
            return self.request(target) { result in
                switch result {
                case let .success(response):
                    continuation.resume(returning: .success(response))
                case let .failure(moyaError):
                    continuation.resume(returning: .failure(moyaError))
                }
            }
        }

        return await withTaskCancellationHandler {
            await withCheckedContinuation { continuation in
                asyncRequestWrapper.perform(continuation: continuation)
            }
        } onCancel: {
            asyncRequestWrapper.cancel()
        }
    }
}
