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
    
    @State
    var showConnect = false
    
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
                                
                ZStack(alignment: .bottom) {
                    Image("bottom-bar")
                        .resizable()
                        .scaledToFit()
                    
                    Button {
                        showConnect = true
                    } label: {
                        Image("connect-button")
                            .resizable()
                            .scaledToFit()
                            .frame(height: 50)
                            .padding(.bottom, 30)
                    }
                }
            }
            .ignoresSafeArea(.all)
            .frame(maxWidth: .infinity)
            .mmBackground()
            .sheet(isPresented: $showConnect) {
                if #available(iOS 16.0, *) {
                    DiscoveryView()
                        .presentationDetents([.height(200)])
                } else {
                    // Fallback on earlier versions
                    Color.clear.background{
                        DiscoveryView()
                            .frame(height: 200)
                    }
                }
            }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        WelcomePage()
    }
}
