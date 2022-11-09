//
//  DiscoveryView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 10/11/2022.
//

import SwiftUI
import FCL

struct DiscoveryView: View {
    
    @Environment(\.presentationMode)
    var presentationMode
    
    var body: some View {
        VStack(spacing: 0) {
            
            Spacer()
            
            HStack {
                Text("Connect Wallet")
                Spacer()
                
                Button {
                    presentationMode.wrappedValue.dismiss()
                } label: {
                    Image(systemName: "xmark")
                        .foregroundColor(.black)
                }
                
            }
            .padding(.vertical, 12)
            .padding(.horizontal, 18)
            Divider()
            
            ScrollView(.horizontal) {
                LazyHStack(alignment: .center, spacing: 18) {
                    ForEach(FCL.Provider.allCases.filter {
                        $0.supportNetwork.contains(.testnet)
                    },
                            id: \.hashValue) { provider in
                        
                        let info = provider.provider(chainId: .testnet)
                        Button {
                            
                            Task {
                                do {
                                    try fcl.changeProvider(provider: provider, env: .testnet)
                                    let _ = try await fcl.authenticate()
                                }
                            }
                            
                        } label: {
                            VStack {
                                AsyncImage(
                                    url: info.logo,
                                    content: { image in
                                        image.resizable()
                                            .aspectRatio(contentMode: .fit)
                                            .frame(maxWidth: 70, maxHeight: 70)
                                            .cornerRadius(10)
                                    },
                                    placeholder: {
//                                        ProgressView()
                                        Color(hex: 0xe0e0e0)
                                            .frame(width: 70, height: 70)
                                            .cornerRadius(10)
                                    }
                                )

                                Text(info.name)
                                    .font(.footnote)
                                    .foregroundColor(.black)
                            }
                            
                        }
                    }
                }.padding(18)
            }
            .background(Color(hex: 0xf0f0f0))
            .frame(height: 150)
        }
        .background(Color.clear)
    }
}

struct DiscoveryView_Previews: PreviewProvider {
    static var previews: some View {
        DiscoveryView()
    }
}
