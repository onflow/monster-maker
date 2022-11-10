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
    
    let scale = 0.8
    
    var body: some View {
        ZStack {
            if let backgroundImage = NFTLocalImage.backgrounds[safe: data.background] {
                Image(backgroundImage)
                    .resizable()
                    .scaledToFit()
                    .zIndex(998)
            }
            
            if let headImage = NFTLocalImage.headers[safe: data.head] {
                Image(headImage)
                    .resizable()
                    .scaledToFit()
                    .zIndex(1000)
                    .offset(x:0, y: appear ? 2 : 0)
                    .animation(Animation.linear(duration: 0.5)
                        .repeatForever(autoreverses: true)
                        .delay(Double.random(in: 0..<1)),
                               value: appear)
                    .onAppear {
                        appear.toggle()
                    }
                    .scaleEffect(CGSize(width: scale, height: scale))
            }
            if let torsoImage = NFTLocalImage.torso[safe: data.torso] {
                Image(torsoImage)
                    .resizable()
                    .scaledToFit()
                    .zIndex(1001)
                    .scaleEffect(CGSize(width: scale, height: scale))
            }
            if let legImage = NFTLocalImage.legs[safe: data.legs] {
                Image(legImage)
                    .resizable()
                    .scaledToFit()
                    .zIndex(999)
                    .scaleEffect(CGSize(width: scale, height: scale))
            }
        }
    }
}

struct NFTLocalView_Previews: PreviewProvider {
    static var previews: some View {
        NFTLocalView(data: .init(background: 0,
                                 head: 0,
                                 torso: 0,
                                 legs: 0))
    }
}
