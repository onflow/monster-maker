//
//  Extension.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import Foundation
import SwiftUI

extension Collection {
    /// Returns the element at the specified index if it is within bounds, otherwise nil.
    subscript(safe index: Index?) -> Element? {
        guard let correctIndex = index else {
            return nil
        }
        return indices.contains(correctIndex) ? self[correctIndex] : nil
    }

    var randomIndex: Int {
        Int.random(in: 0 ..< count)
    }
}

extension View {
    func snapshot() -> UIImage {
        let controller = UIHostingController(rootView: edgesIgnoringSafeArea(.all))
        let view = controller.view

        let targetSize = controller.view.intrinsicContentSize
        view?.bounds = CGRect(origin: .zero, size: targetSize)
        view?.backgroundColor = .clear

        let renderer = UIGraphicsImageRenderer(size: targetSize)

        return renderer.image { _ in
            view?.drawHierarchy(in: controller.view.bounds, afterScreenUpdates: true)
        }
    }
}

extension Color {
    static var random: Color {
        return Color(red: .random(in: 0 ... 1),
                     green: .random(in: 0 ... 1),
                     blue: .random(in: 0 ... 1))
    }

    init(hex: UInt, alpha: Double = 1) {
        self.init(
            .sRGB,
            red: Double((hex >> 16) & 0xFF) / 255,
            green: Double((hex >> 08) & 0xFF) / 255,
            blue: Double((hex >> 00) & 0xFF) / 255,
            opacity: alpha
        )
    }
}
