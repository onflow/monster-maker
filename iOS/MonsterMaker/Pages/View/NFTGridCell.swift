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
        }
    }
}


struct NFTGridCell_Previews: PreviewProvider {
    static var previews: some View {
        NFTGridCell(data: .init(background: 0, head: 0, torso: 0, legs: 0))
    }
}
