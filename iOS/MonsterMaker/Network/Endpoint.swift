//
//  Endpoint.swift
//  MonsterMaker
//
//  Created by Hao Fu on 5/11/2022.
//

import Foundation
import Moya
import Flow

enum NFTEndpoint {
    case mint(MintRequest)
    case signerInfo
    case signAsMinter(MinterRequest)
}

extension NFTEndpoint: TargetType {
    var baseURL: URL {
        .init(string: "https://monster-maker.vercel.app/api")!
    }
    
    var path: String {
        switch self {
        case .mint:
            return "/mint"
        case .signerInfo:
            return "/signAsMinter/info"
        case .signAsMinter:
            return "/signAsMinter"
        }
    }
    
    var method: Moya.Method {
        switch self {
        case .mint, .signAsMinter:
            return .post
        case .signerInfo:
            return .get
        }
    }
    
    var task: Moya.Task {
        switch self {
        case let .mint(request):
            return .requestJSONEncodable(request)
        case let .signAsMinter(request):
            return .requestJSONEncodable(request)
        case .signerInfo:
            return .requestPlain
        }
    }
    
    var headers: [String : String]? {
        ["network": flow.chainID.name]
    }
}
