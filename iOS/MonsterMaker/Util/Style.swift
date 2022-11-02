//
//  Style.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import Foundation
import SwiftUI

extension Color {
    class MM {
        static let dark = Color("dark")
        static let background = Color("background")
        static let grey = Color("grey")
        static let white = Color("white")
    }
}

extension Font {
    class MM {
        static let body = Font.custom("Montserrat", size: 18, relativeTo: .body)
        static let title = Font.custom("Montserrat", size: 32, relativeTo: .title).weight(.bold)
    }
}

// Padding
extension CGFloat {
    class MM  {
        static let standard: CGFloat = 12
        static let double: CGFloat = 24
        static let large: CGFloat = 48
    }
}
