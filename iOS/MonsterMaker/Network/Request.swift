//
//  NetworkRequest.swift
//  MonsterMaker
//
//  Created by Hao Fu on 5/11/2022.
//

import Foundation

struct MintRequest: Codable {
    let address: String
    let components: NFTLocalData
    
    struct Components: Codable {
        let background, head, torso, legs: Int
    }
}

struct WalletResponse<T: Decodable>: Decodable {
    let status: Int
    let data: T
}

struct MinterRequest: Codable {
    let message: String
}

struct MinterResponse: Codable {
    let address: String
    let keyIndex: Int
    let sig: String
    
    enum CodingKeys: String, CodingKey {
        case address
        case keyIndex
        case sig = "signature"
    }
}
