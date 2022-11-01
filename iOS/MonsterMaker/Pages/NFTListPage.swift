//
//  NFTListPage.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI



struct NFTListPage: View {
    
    let data = (1...20).map { "Item \($0)" }
    
    let columns = [
        GridItem(.flexible(), spacing: 10),
        GridItem(.flexible(), spacing: 10),
    ]
    
    func randonIndex(_ list: [Any]) -> Int {
        Int.random(in: 0..<list.count)
    }
    
    var body: some View {
        VStack {
            HeaderView(title: "My Monster")
            ScrollView {
                LazyVGrid(columns: columns, alignment: .center, spacing: 10) {
                    ForEach(1..<20) { index in
                        NFTGridCell(data: .init(headIndex: randonIndex(NFTLocalImage.headers),
                                                torsoIndex: randonIndex(NFTLocalImage.torso),
                                                legIndex: randonIndex(NFTLocalImage.legs)))
                    }
                }
                .padding(.horizontal, 10)
            }.background(Color.MM.background)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.MM.background)
    }
}

struct NFTListPage_Previews: PreviewProvider {
    static var previews: some View {
        NFTListPage()
    }
}
