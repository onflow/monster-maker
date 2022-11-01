//
//  NFTLocalView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI

struct NFTLocalData {
    var headIndex: Int
    var torsoIndex: Int
    var legIndex: Int
}

struct NFTLocalView: View {
    var data: NFTLocalData
    
    var body: some View {
        VStack(spacing: 0) {
            if let headImage = NFTLocalImage.headers[safe: data.headIndex] {
                Image(headImage)
            }
            if let torsoImage = NFTLocalImage.torso[safe: data.torsoIndex] {
                Image(torsoImage)
            }
            if let legImage = NFTLocalImage.legs[safe: data.legIndex] {
                Image(legImage)
            }
        }
    }
}

struct NFTLocalView_Previews: PreviewProvider {
    static var previews: some View {
        NFTLocalView(data: .init(headIndex: 0,
                                 torsoIndex: 0,
                                 legIndex: 0))
    }
}
