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
    
    @StateObject
    var vm = MMViewModel()
    
    init () {
        FlowClient.setup()
    }
    
    var body: some Scene {
        WindowGroup {
//            if vm.isLogin {
                MainTabPage()
                    .mmBackground()
//            } else {
//                WelcomePage()
//                    .mmBackground()
//            }
        }
    }
}


class MMViewModel: ObservableObject {
    @Published
    var isLogin: Bool = false
    
    private var cancellables = Set<AnyCancellable>()
    
    init() {
        fcl.$currentUser.sink { [weak self] user in
            if let user = user {
                print("<==== Current User =====>")
                print(user)
                DispatchQueue.main.async {
                    self?.isLogin = true
                }
            } else {
                print("<==== No User =====>")
                DispatchQueue.main.async {
                    self?.isLogin = false
                }
            }
        }.store(in: &cancellables)
    }
}
