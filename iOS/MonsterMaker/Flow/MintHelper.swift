//
//  MintHelper.swift
//  MonsterMaker
//
//  Created by Hao Fu on 21/11/2022.
//

import Alamofire
import FCL
import Flow
import Foundation

struct MinterInfo: Codable {
    let address: String
    let keyIndex: Int
}

class MinterHelper {
    static let shared = MinterHelper()

    var info: MinterInfo = .init(address: "0xfd3d8fe2c8056370", keyIndex: 0)

    init() {
        Task {
            loadLocalConfig()
            try? await fetch()
        }
    }

    func loadLocalConfig() {
        info = .init(address: "0xfd3d8fe2c8056370", keyIndex: 0)
    }

    func fetch() async throws {
        let payer = try await MinterHelper.fetchPayer()
        info = payer
    }

    static func fetchPayer() async throws -> MinterInfo {
        let response: WalletResponse<MinterInfo> = try await Network.request(NFTEndpoint.signerInfo)
        return response.data
    }

    static func signAsPayer(message: String) async throws -> MinterResponse {
        let response: WalletResponse<MinterResponse> = try await Network.request(NFTEndpoint.signAsMinter(.init(message: message)))
        return response.data
    }
}

extension MinterHelper: FlowSigner {
    var address: Flow.Address {
        return .init(hex: info.address)
    }

    var keyIndex: Int {
        return info.keyIndex
    }

    func sign(transaction _: Flow.Transaction, signableData: Data) async throws -> Data {
        let response = try await MinterHelper.signAsPayer(message: signableData.hexValue)
        return response.signature.data
    }
}

extension MinterHelper: FCLSigner {
    func signingFunction(signable: FCL.Signable) async throws -> AuthzResponse {
        return try await MinterHelper.signAsPayer(message: signable.message)
    }
}

extension MinterResponse: AuthzResponse {
    var addr: Flow.Address {
        .init(hex: address)
    }

    var keyId: Int {
        keyIndex
    }

    var signature: Flow.Signature {
        .init(hex: sig)
    }
}
