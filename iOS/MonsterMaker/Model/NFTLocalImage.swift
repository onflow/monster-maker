//
//  NFTLocalImage.swift
//  MonsterMaker
//
//  Created by Hao Fu on 2/11/2022.
//

import Foundation

enum NFTComponent {
    case background
    case legs
    case head
    case torso
}

struct NFTLocalData: Codable {
    var background: Int
    var head: Int
    var torso: Int
    var legs: Int
}

enum NFTLocalImage {
    static var backgrounds: [String] = {
        (1 ... 5).compactMap { "bg_\(String($0))" }
    }()

    static var headers: [String] = {
        (1 ... 20).compactMap { "monster_head_\(String($0))" }
    }()

    static var legs: [String] = {
        (1 ... 20).compactMap { "monster_legs_\(String($0))" }
    }()

    static var torso: [String] = {
        (1 ... 20).compactMap { "monster_torso_\(String($0))" }
    }()
}
