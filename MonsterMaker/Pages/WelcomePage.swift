//
//  ContentView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI

struct WelcomePage: View {
    var body: some View {
        NavigationView {
            VStack {
                Spacer()
                Text("Master \n Maker")
                    .font(.custom("Montserrat", size: 60).weight(.regular))
                    .textCase(.uppercase)
                    .foregroundColor(Color.MM.dark)
                
                
                Spacer()
                
                NavigationLink {
                    MainTabPage()
                } label: {
                    Text("Connect")
                        .font(.custom("Montserrat", size: 32).weight(.bold))
                        .padding(.horizontal, 24)
                        .padding(.vertical, 12)
                        .frame(maxWidth: .infinity, alignment: .center)
                        .background(Color.MM.dark)
                        .foregroundColor(.MM.white)
                        .cornerRadius(8)
                        .textCase(.uppercase)
                    
                }
                
//                PrimaryButtonView(title: "Connect") {
//
//                }
//                .padding(.bottom, 24)
            }
            .padding()
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        WelcomePage()
    }
}
