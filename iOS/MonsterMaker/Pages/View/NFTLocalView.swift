//
//  NFTLocalView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI

struct NFTLocalView: View {
    var data: NFTLocalData
    
    @State
    var appear = false
    
    var body: some View {
        ZStack {
            if let backgroundImage = NFTLocalImage.backgrounds[safe: data.backgroundIndex] {
                Image(backgroundImage)
                    .resizable()
                    .scaledToFit()
                    .zIndex(998)
            }
            
            if let headImage = NFTLocalImage.headers[safe: data.headIndex] {
                Image(headImage)
                    .resizable()
                    .scaledToFit()
                    .zIndex(1000)
                    .offset(x:0, y: appear ? 2 : 0)
                    .animation(Animation.linear(duration: 0.5).repeatForever(autoreverses: true), value: appear)
                    .onAppear {
                        appear.toggle()
                    }
            }
            if let torsoImage = NFTLocalImage.torso[safe: data.torsoIndex] {
                Image(torsoImage)
                    .resizable()
                    .scaledToFit()
                    .zIndex(1001)
            }
            if let legImage = NFTLocalImage.legs[safe: data.legIndex] {
                Image(legImage)
                    .resizable()
                    .scaledToFit()
                    .zIndex(999)
            }
        }
    }
}

struct NFTLocalView_Previews: PreviewProvider {
    static var previews: some View {
        NFTLocalView(data: .init(backgroundIndex: 0,
                                 headIndex: 0,
                                 torsoIndex: 0,
                                 legIndex: 0))
    }
}
