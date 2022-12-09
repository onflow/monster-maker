//
//  Style.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import Foundation
import SwiftUI

extension Color {
    enum MM {
        static let dark = Color("dark")
        static let background = Color("background")
        static let grey = Color("grey")
        static let white = Color("white")
    }
}

extension Font {
    enum MM {
        static let body = Font.custom("Montserrat", size: 18, relativeTo: .body)
        static let title = Font.custom("Montserrat", size: 32, relativeTo: .title).weight(.bold)
    }
}

// Padding
extension CGFloat {
    enum MM {
        static let zero: CGFloat = 0
        static let small: CGFloat = 8
        static let standard: CGFloat = 12
        static let medium: CGFloat = 16
        static let double: CGFloat = 24
        static let large: CGFloat = 48
        static let xlarge: CGFloat = 64
    }

    static let screenWidth = UIScreen.main.bounds.width
    static let screenHeight = UIScreen.main.bounds.height
}
