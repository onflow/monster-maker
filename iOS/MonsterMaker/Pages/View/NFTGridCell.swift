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
            
            NFTLocalView(data: data)
                .cornerRadius(12)
            
            Text("NFT \(data.headIndex)\(data.torsoIndex)\(data.legIndex)")
                .font(.MM.body)
                .fontWeight(.semibold)
        }
    }
}


struct NFTGridCell_Previews: PreviewProvider {
    static var previews: some View {
        NFTGridCell(data: .init(backgroundIndex: 0, headIndex: 0, torsoIndex: 0, legIndex: 0))
    }
}
