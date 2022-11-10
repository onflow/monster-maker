//
//  HeaderView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI
import FCL

struct HeaderView: View {
    
    var title: String
    
    @State
    var showWebView = false
    
    var body: some View {
        HStack {
            
            Button {
                if let _ = FlowManager.shared.pendingTx {
                    showWebView.toggle()
                }
            } label: {
                if let _ = FlowManager.shared.pendingTx {
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
                fcl.unauthenticate()
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
            if let txId = FlowManager.shared.pendingTx,
                let url = URL(string: "https://testnet.flowscan.org/transaction/\(txId)") {
                SafariView(url: url)
            }
        }
    }
}

struct HeaderView_Previews: PreviewProvider {
    static var previews: some View {
        HeaderView(title: "Monster Maker")
    }
}
