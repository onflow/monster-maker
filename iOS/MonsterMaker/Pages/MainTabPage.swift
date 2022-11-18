//
//  MainTabPage.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI

struct MainTabPage: View {
    
    @State
    var isInit = false
    
    @State
    var selectedIndex: Int = 0
    
    var body: some View {
        NavigationView{
            ZStack {
                if isInit {
                    TabView(selection: $selectedIndex) {
                        MakerPage(vm: .init(MakerViewModel()))
                            .tag(0)
                        NFTListPage(vm: .init(NFTListViewModel()))
                            .tag(1)
                    }
                    .navigationBarHidden(true)

                    TabBarView(items: [
                        .init(image: "create-button-off",
                              selectedImage: "create-button-on"),
                        .init(image: "view-button-off" ,
                              selectedImage: "view-button-on")
                    ],
                               selectedIndex: $selectedIndex)
                } else {
                    InitPage(vm: .init(InitViewModel()))
                        .frame(maxWidth: .infinity, maxHeight: .infinity)
                }
            }
            .onAppear {
                Task {
                    isInit = try await FlowManager.shared.checkCollectionVault()
                }
            }.onReceive(FlowManager.shared.$pendingTx) { value in
                Task {
                    isInit = try await FlowManager.shared.checkCollectionVault()
                }
            }
        }
    }
}

struct MainTabPage_Previews: PreviewProvider {
    static var previews: some View {
        MainTabPage()
    }
}
