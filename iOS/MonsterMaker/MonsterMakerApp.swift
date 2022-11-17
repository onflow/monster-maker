//
//  MonsterMakerApp.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI
import Combine
import FCL
import Instabug

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
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey : Any]? = nil) -> Bool {
        Instabug.start(withToken: "37c1409f4fa0b8a5c7efcf8cdc797d59", invocationEvents: [.shake, .screenshot])
        FlowManager.shared.setup()
        return true
    }
}
