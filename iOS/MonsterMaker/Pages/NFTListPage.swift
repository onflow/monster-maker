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
    
    var body: some View {
        VStack(spacing: .MM.zero) {
                HeaderView(title: "My Monster")
                Spacer()
                ScrollView {
                    LazyVGrid(columns: columns, alignment: .center, spacing: 10) {
                        ForEach(1..<20) { index in
                            let data: NFTLocalData = .init(background: NFTLocalImage.backgrounds.randomIndex,
                                                           head: NFTLocalImage.headers.randomIndex,
                                                           torso: NFTLocalImage.torso.randomIndex,
                                                           legs: NFTLocalImage.legs.randomIndex)
                            
                            NavigationLink {
                                NFTDetailView(data: data)
                            } label: {
                                NFTGridCell(data: data)
                                    .frame(width: NFTListPage.width, height: NFTListPage.width + 20)
                            }
                        }
                    }
                    .padding(.horizontal, 10)
                }.background(.clear)
            }
            .mmBackground()
        }
//            .frame(maxWidth: .screenWidth, maxHeight: .screenHeight)
}

struct NFTListPage_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            NFTListPage()
        }
    }
}
