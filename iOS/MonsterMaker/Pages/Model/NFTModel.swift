//
//  NFTModel.swift
//  MonsterMaker
//
//  Created by Hao Fu on 11/11/2022.
//

import Foundation

struct NFTModel: Codable {
    let name: String
    let description: String
    let thumbnail: String
    let itemID: UInt64
    let resourceID: UInt64
    let owner: String
    let component: NFTLocalData
}
