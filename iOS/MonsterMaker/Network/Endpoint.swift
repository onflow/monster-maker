//
//  Endpoint.swift
//  MonsterMaker
//
//  Created by Hao Fu on 5/11/2022.
//

import Foundation
import Moya

enum NFTEndpoint {
    case mint(MintRequest)
}

extension NFTEndpoint: TargetType {
    var baseURL: URL {
        .init(string: "https://monster-maker.vercel.app/api")!
    }
    
    var path: String {
        switch self {
        case .mint:
            return "/mint"
        }
    }
    
    var method: Moya.Method {
        switch self {
        case .mint:
            return .post
        }
    }
    
    var task: Moya.Task {
        switch self {
        case let .mint(request):
            return .requestJSONEncodable(request)
        }
    }
    
    var headers: [String : String]? {
        nil
    }
}
