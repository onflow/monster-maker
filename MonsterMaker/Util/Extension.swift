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
