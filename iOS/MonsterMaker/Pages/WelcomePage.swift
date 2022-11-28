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
    var isShown = false
    
    var body: some View {
        NavigationView {
            
            ZStack(alignment: .bottom) {
                
                VStack(spacing: 0) {
                    
                    Spacer()
                    
                    Image("logo")
                        .resizable()
                        .scaledToFit()
                        .frame(maxWidth: .infinity)
                        .padding(.horizontal, .MM.double)
                    
                    Spacer()
                }
                                
                ZStack(alignment: .bottom) {
                    Image("bottom-bar")
                        .resizable()
                        .scaledToFit()
                    
                    Button {
                        fcl.openDiscovery()
                    } label: {
                        Image("connect-button")
                            .resizable()
                            .scaledToFit()
                            .frame(height: 50)
                            .padding(.bottom, 48)
                    }
                }
                .offset(y: isShown ? 0 : 300)
                .animation(.easeInOut(duration: 1), value: isShown)
            }
            .onAppear{
                isShown = true
            }
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

struct ClearBackgroundView: UIViewRepresentable {
    func makeUIView(context: Context) -> some UIView {
        let view = UIView()
        DispatchQueue.main.async {
            view.superview?.superview?.backgroundColor = .clear
        }
        return view
    }
    func updateUIView(_ uiView: UIViewType, context: Context) {
    }
}
