//
//  MonsterMakerApp.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI
import Combine
import FCL

@main
struct MonsterMakerApp: App {
    
    @State
    var isLogin: Bool = false
    
    init () {
        FlowManager.shared.setup()
    }
    
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
