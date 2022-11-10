//
//  NFTListViewModel.swift
//  MonsterMaker
//
//  Created by Hao Fu on 11/11/2022.
//

import Foundation
import FCL

class NFTListViewModel: ViewModel {
    @Published
    private(set) var state: NFTListPage.ViewState = .init(nfts: [])
    
    func trigger(_ input: NFTListPage.Action) {
        switch input {
        case .load:
            guard let address = fcl.currentUser?.addr else {
                return
            }
            Task {
                do {
                    
                    let idList: [UInt64] = try await fcl.query(script: MonsterMakerCadence.nftIDs, args: [.init(value: .address(address))]).decode()
                    print(idList)
                    
                    let nftList: [NFTModel] = try await fcl.query(script: MonsterMakerCadence.nftList, args: [.init(value: .address(address))]).decode()
                    print(nftList)
                } catch {
                    print(error)
                }
            }
        }
    }
}


class MockNFTListViewModel: ViewModel {
    
    @Published
    private(set) var state: NFTListPage.ViewState = .init(nfts: [])
    
    func trigger(_ input: NFTListPage.Action) {
        switch input {
        case .load:
            let randomList = (1..<20).compactMap { index in
                let data = NFTLocalData(background: NFTLocalImage.backgrounds.randomIndex,
                                        head: NFTLocalImage.headers.randomIndex,
                                        torso: NFTLocalImage.torso.randomIndex,
                                        legs: NFTLocalImage.legs.randomIndex)
                
                return NFTModel(name: "NFT #\(index)",
                                description: "",
                                thumbnail: "",
                                itemID: UInt64(index),
                                resourceID: UInt64(index),
                                owner: "",
                                component: data)
            }
            
            DispatchQueue.main.async {
                self.state.nfts = randomList
            }
        }
    }
}
