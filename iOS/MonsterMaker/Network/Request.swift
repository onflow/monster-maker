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
