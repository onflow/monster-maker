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
            
            ZStack(alignment: .bottom) {
                
                VStack(spacing: 0) {
                    
                    Spacer()
                    
                    Image("logo")
                        .resizable()
                        .scaledToFit()
                        .frame(width: UIScreen.main.bounds.width - 2*CGFloat.MM.large)
                    
                    
                    Spacer()
                }
                
                Button {
                    Task {
                        fcl.changeProvider(provider: .lilico, env: .testnet)
                        let _ = try await fcl.authenticate()
                    }
                    
                } label: {
                    Image("bottom-bar")
                        .resizable()
                        .scaledToFit()
                }
            }
                
//                PrimaryButtonView(title: "Connect") {
//                    Task {
//                        let wallet = FCL.WalletProvider(id: "Dapper Pro",
//                                                          name: "Dapper Pro",
//                                                          method: .walletConnect,
//                                                          endpoint: "dapper-pro://",
//                                                          supportNetwork: [.testnet])
//
//                        let provider: FCL.Provider = .custom(wallet)
//                        fcl.changeProvider(provider: provider, env: .testnet)
//                        let _ = try await fcl.authenticate()
//                    }
//                }
                
//                PrimaryButtonView(title: "Connect lilico") {
//                    Task {
//                        fcl.changeProvider(provider: .lilico, env: .testnet)
//                        let _ = try await fcl.authenticate()
//                    }
//                }
//
//
//                PrimaryButtonView(title: "Connect blocto") {
//                    Task {
//                        fcl.changeProvider(provider: .blocto, env: .testnet)
//                        let _ = try await fcl.authenticate()
//                    }
//                }
            .ignoresSafeArea(.all)
            .frame(maxWidth: .infinity)
            .mmBackground()
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        WelcomePage()
    }
}
