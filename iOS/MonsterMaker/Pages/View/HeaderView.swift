//
//  HeaderView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI
import FCL

struct HeaderView: View {
    
    @State
    var pendingTx = FlowManager.shared.pendingTx
    
    @State
    var lastTxId = ""
    
    @State
    var showWebView = false
    
    var body: some View {
        HStack {
            
            Button {
                if let _ = pendingTx {
                    showWebView.toggle()
                }
            } label: {
                if let _ = pendingTx {
                    ProgressView()
                        .progressViewStyle(CircularProgressViewStyle(tint: .yellow))
                }
            }
            .frame(width: 50)
            
            Spacer()
            
            Image("logo")
                .resizable()
                .scaledToFit()
                .frame(height: 50)
            
            Spacer()
            
            Button {
                Task {
                    UIImpactFeedbackGenerator(style: .medium).impactOccurred()
                    try? await fcl.unauthenticate()
                }
            } label: {
                Image("exit")
            }
            .frame(width: 50)
            
        }
        .frame(maxWidth: .infinity)
        .frame(height: 56)
        .padding(.horizontal, .MM.standard)
        .background(.clear)
        .sheet(isPresented: $showWebView) {
            if let url = URL(string: "https://testnet.flowscan.org/transaction/\(lastTxId)") {
                SafariView(url: url)
            }
        }
        .onReceive(FlowManager.shared.$pendingTx) { value in
            self.pendingTx = value
            if let value {
                self.lastTxId = value
            }
        }
    }
}

struct HeaderView_Previews: PreviewProvider {
    static var previews: some View {
        HeaderView()
    }
}
