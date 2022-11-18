//
//  NFTListPage.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI

extension NFTListPage {
    struct ViewState {
        var nfts: [NFTModel]
    }

    enum Action {
        case load
    }
}

struct NFTListPage: View {
    
    @StateObject
    var vm: AnyViewModel<ViewState, Action>
    
    static let spacing: CGFloat = 10
    
    static let width: CGFloat = (UIScreen.main.bounds.width - 3 * NFTListPage.spacing)/2
    
    let columns = [
        GridItem(.fixed(NFTListPage.width), spacing: spacing),
        GridItem(.fixed(NFTListPage.width), spacing: spacing),
    ]
    
    var body: some View {
        VStack(spacing: .MM.zero) {
                HeaderView()
                Spacer()
                ScrollView {
                    LazyVGrid(columns: columns,
                              alignment: .center,
                              spacing: NFTListPage.spacing) {
                        ForEach(vm.nfts, id: \.name) { nft in
                            NavigationLink {
                               NFTDetailView(data: nft)
                           } label: {
                               NFTGridCell(data: nft.component)
                                   .frame(width: NFTListPage.width,
                                          height: NFTListPage.width + 20)
                           }
                        }
                    }
                    .padding(.horizontal, .MM.standard)
                    .padding(.bottom, 80)
                }.background(.clear)
            }
            .mmBackground()
            .onAppear {
                vm.trigger(.load)
            }
        }
}

struct NFTListPage_Previews: PreviewProvider {
    static var previews: some View {
        NavigationView {
            NFTListPage(vm: .init(MockNFTListViewModel()))
        }
    }
}
