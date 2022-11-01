//
//  NFTGridCell.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI

struct NFTGridCell: View {
    
    var data: NFTLocalData
    
    var body: some View {
        VStack(alignment: .center) {
            
            if #available(iOS 16.0, *) {
                let renderer = ImageRenderer(content: NFTLocalView(data: data))
                if let image = renderer.uiImage {
                    Image(uiImage: image)
                        .resizable()
                        .scaledToFit()
                        .padding()
                        .background(Color.MM.grey)
                        .cornerRadius(12)
                }
            } else {
                let image = NFTLocalView(data: data).snapshot()
                Image(uiImage: image)
                    .resizable()
                    .scaledToFit()
                    .padding()
                    .background(Color.MM.grey)
                    .cornerRadius(12)
            }
            
            Text("NFT \(data.headIndex)\(data.torsoIndex)\(data.legIndex)")
                .font(.MM.body)
                .fontWeight(.semibold)
        }
    }
}


struct NFTGridCell_Previews: PreviewProvider {
    static var previews: some View {
        NFTGridCell(data: .init(headIndex: 0, torsoIndex: 0, legIndex: 0))
    }
}
