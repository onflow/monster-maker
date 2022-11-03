//
//  NFTListPage.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI

struct NFTListPage: View {
    
    let data = (1...20).map { "Item \($0)" }
    
    static let spacing: CGFloat = 10
    
    static let width: CGFloat = (UIScreen.main.bounds.width - 3 * NFTListPage.spacing)/2
    
    let columns = [
        GridItem(.fixed(NFTListPage.width), spacing: 10),
        GridItem(.fixed(NFTListPage.width), spacing: 10),
    ]
    
    func randonIndex(_ list: [Any]) -> Int {
        Int.random(in: 0..<list.count)
    }
    
    var body: some View {
        NavigationView {
            VStack {
                HeaderView(title: "My Monster")
                ScrollView {
                    LazyVGrid(columns: columns, alignment: .center, spacing: 10) {
                        ForEach(1..<20) { index in
                            let data: NFTLocalData = .init(backgroundIndex: randonIndex(NFTLocalImage.backgrounds),
                                                           headIndex: randonIndex(NFTLocalImage.headers),
                                                           torsoIndex: randonIndex(NFTLocalImage.torso),
                                                           legIndex: randonIndex(NFTLocalImage.legs))
                            
                            NavigationLink {
                                NFTDetailView(data: data)
                            } label: {
                                NFTGridCell(data: data)
                                    .frame(width: NFTListPage.width, height: NFTListPage.width + 20)
                            }
                        }
                    }
                    .padding(.horizontal, 10)
                }.background(Color.MM.background)
            }
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
