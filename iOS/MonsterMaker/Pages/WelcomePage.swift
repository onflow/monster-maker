//
//  ContentView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI
import FCL
import Combine

struct WelcomePage: View {
    
    var body: some View {
        NavigationView {
            VStack(spacing: .MM.standard) {
                Spacer()
                Text("Monster \n Maker")
                    .font(.custom("Montserrat", size: 60).weight(.regular))
                    .textCase(.uppercase)
                    .foregroundColor(Color.MM.dark)
                
                
                Spacer()
                
//                NavigationLink {
//                    MainTabPage()
//                } label: {
//                    Text("Connect")
//                        .font(.custom("Montserrat", size: 32).weight(.bold))
//                        .padding(.horizontal, 24)
//                        .padding(.vertical, 12)
//                        .frame(maxWidth: .infinity, alignment: .center)
//                        .background(Color.MM.dark)
//                        .foregroundColor(.MM.white)
//                        .cornerRadius(8)
//                        .textCase(.uppercase)
//
//                }
                
                
                PrimaryButtonView(title: "Connect Dapper") {
                    Task {
                        let wallet = FCL.WalletProvider(id: "Dapper Pro",
                                                          name: "Dapper Pro",
                                                          method: .walletConnect,
                                                          endpoint: "dapper-pro://",
                                                          supportNetwork: [.testnet])
                        
                        let provider: FCL.Provider = .custom(wallet)
                        fcl.changeProvider(provider: provider, env: .testnet)
                        let _ = try await fcl.authenticate()
                    }
                }
                
                PrimaryButtonView(title: "Connect lilico") {
                    Task {
                        fcl.changeProvider(provider: .lilico, env: .testnet)
                        let _ = try await fcl.authenticate()
                    }
                }
                
                
                PrimaryButtonView(title: "Connect blocto") {
                    Task {
                        fcl.changeProvider(provider: .blocto, env: .testnet)
                        let _ = try await fcl.authenticate()
                    }
                }
                .padding(.bottom, 24)
                
//                NavigationLink("",
//                               destination: MainTabPage(),
//                               isActive: $isLogin)
                
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
