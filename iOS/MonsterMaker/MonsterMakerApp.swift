//
//  MonsterMakerApp.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import Combine
import FCL
import SwiftUI

@main
struct MonsterMakerApp: App {
    @UIApplicationDelegateAdaptor(AppDelegate.self)
    var appDelegate

    @State
    var isLogin: Bool = false

    var body: some Scene {
        WindowGroup {
            if isLogin {
                MainTabPage()
                    .onReceive(fcl.$currentUser) { value in
                        self.isLogin = (value != nil)
                    }
            } else {
                WelcomePage()
                    .onReceive(fcl.$currentUser) { value in

                        self.isLogin = (value != nil)
                    }
            }
        }
    }
}

class AppDelegate: NSObject, UIApplicationDelegate {
    func application(_: UIApplication, didFinishLaunchingWithOptions _: [UIApplication.LaunchOptionsKey: Any]? = nil) -> Bool {
        FlowManager.shared.setup()
        return true
    }
}
