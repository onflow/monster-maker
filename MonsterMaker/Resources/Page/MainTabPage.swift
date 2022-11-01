//
//  MainTabPage.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI

struct MainTabPage: View {
    
    @State
    var selectedIndex: Int = 0
    
    var body: some View {
        ZStack {
            TabView(selection: $selectedIndex) {
                MakerPage()
                    .tag(0)
                MakerPage()
                    .tag(1)
            }
        
            TabBarView(items:[
                .init(systemImage: "square.and.pencil"),
                .init(systemImage: "square.grid.2x2.fill")
            ],
                       selectedIndex: $selectedIndex)
//            .frame(maxWidth: .infinity, maxHeight: .infinity)
//            .ignoresSafeArea()
        }
    }
}

struct MainTabPage_Previews: PreviewProvider {
    static var previews: some View {
        MainTabPage()
    }
}
