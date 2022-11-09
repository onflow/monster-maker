//
//  View.swift
//  MonsterMaker
//
//  Created by Hao Fu on 7/11/2022.
//

import Foundation
import SwiftUI

struct GridentBackground: ViewModifier {
    var colors: [Color]
    var startPoint: UnitPoint = .top
    var endPoint: UnitPoint = .bottom

    func body(content: Content) -> some View {
        content
            .background{
                LinearGradient(colors: colors,
                               startPoint: startPoint,
                               endPoint: endPoint)
                .ignoresSafeArea()
            }
    }
}

extension View {
    func mmBackground() -> some View {
        modifier(GridentBackground(colors: [Color(hex: 0x061B20),
                                            Color(hex: 0x1C6470),
                                            Color(hex: 0xD3E549)]))
    }
}

enum ViewVisibility: CaseIterable {
    case visible
    case invisible
    case gone
}

extension View {
    @ViewBuilder func visibility(_ visibility: ViewVisibility) -> some View {
        if visibility != .gone {
            if visibility == .visible {
                self
            } else {
                hidden()
            }
        }
    }
}

public extension UIApplication {
    func currentUIWindow() -> UIWindow? {
        let connectedScenes = UIApplication.shared.connectedScenes
            .filter { $0.activationState == .foregroundActive }
            .compactMap { $0 as? UIWindowScene }
        
        let window = connectedScenes.first?
            .windows
            .first { $0.isKeyWindow }

        return window
        
    }
}
