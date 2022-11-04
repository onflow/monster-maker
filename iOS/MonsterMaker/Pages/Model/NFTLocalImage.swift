//
//  NFTLocalImage.swift
//  MonsterMaker
//
//  Created by Hao Fu on 2/11/2022.
//

import Foundation

enum NFTComponent {
    case background
    case leg
    case head
    case torso
}

struct NFTLocalData {
    var backgroundIndex: Int
    var headIndex: Int
    var torsoIndex: Int
    var legIndex: Int
}


class NFTLocalImage {
    
    static var backgrounds: [String] = {
        (1...10).compactMap { "bg_\(String($0))"}
    }()
    
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