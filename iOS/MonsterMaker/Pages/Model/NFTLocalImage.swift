//
//  NFTLocalImage.swift
//  MonsterMaker
//
//  Created by Hao Fu on 2/11/2022.
//

import Foundation

enum NFTComponent {
    case head
    case torso
    case leg
}

class NFTLocalImage {
    static var headers: [String] = {
        (1...5).compactMap { "monster_head_\(String($0))"}
    }()
    
    static var legs: [String] = {
        (1...5).compactMap { "monster_legs_\(String($0))"}
    }()
    
    static var torso: [String] = {
        (1...10).compactMap { "monster_torso_\(String($0))"}
    }()
}
