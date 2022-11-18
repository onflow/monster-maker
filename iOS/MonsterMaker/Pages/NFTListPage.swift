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
        GridItem(.fixed(NFTListPage.width), spacing: 10),
        GridItem(.fixed(NFTListPage.width), spacing: 10),
    ]
    
    var body: some View {
        VStack(spacing: .MM.zero) {
                HeaderView()
                Spacer()
            
                RefreshableScrollView {
                    LazyVGrid(columns: columns, alignment: .center, spacing: 10) {
                        ForEach(vm.nfts, id: \.name) { nft in
                            // Hide arrow from list cell
                            ZStack {
                                NFTGridCell(data: nft.component)
                                    .frame(width: NFTListPage.width,
                                           height: NFTListPage.width + 20)
                                
                                NavigationLink(destination: NFTDetailView(data: nft)) {
                                                EmptyView()
                                            }
                                .buttonStyle(PlainButtonStyle())
                                .opacity(0)
                            }
                        }
                    }
                    .padding(.horizontal, .MM.standard)
                    .padding(.bottom, 80)
                    
                } onRefresh: {
                    vm.trigger(.load)
                }
                .background(.clear)
            }
            .mmBackground()
            .task {
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
