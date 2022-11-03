//
//  NFTDetailView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 3/11/2022.
//

import SwiftUI

struct NFTDetailView: View {
    
    let data: NFTLocalData
    
    var body: some View {
        VStack {
            HStack {
                Button {
                    //
                } label: {
                    Image(systemName: "xmark.circle.fill")
                        .font(.largeTitle)
                        .foregroundColor(.MM.dark)
                }

                Spacer()
            }.padding(.horizontal, .MM.standard)
            
            NFTLocalView(data: data)
            
            Text("NFT \(data.headIndex)\(data.torsoIndex)\(data.legIndex)")
                .font(.largeTitle)
                .fontWeight(.semibold)
            
            Spacer()
            PrimaryButtonView(title: "Share") {
                
            }
            .padding(.horizontal, .MM.double)
        }
        .padding(.bottom, .MM.double)
    }
}

struct NFTDetailView_Previews: PreviewProvider {
    static var previews: some View {
        NFTDetailView(data: .init(backgroundIndex: 0,
                                  headIndex: 0,
                                  torsoIndex: 0,
                                  legIndex: 0))
    }
}
