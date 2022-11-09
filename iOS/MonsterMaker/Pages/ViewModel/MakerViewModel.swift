//
//  MakerViewModel.swift
//  MonsterMaker
//
//  Created by Hao Fu on 5/11/2022.
//

import Foundation
import FCL

class MakerViewModel: ViewModel {
    @Published
    private(set) var state: MakerPage.ViewState = .init()
    

    func trigger(_ input: MakerPage.Action) {
        switch input {
        case .mint:
            
            guard let address = fcl.currentUser?.addr else {
                return
            }
            
            Task {
                
                do {
                    
                    let isEnabled = try await FlowClient.checkCollectionVault()
                    
                    if isEnabled {
                        let request = MintRequest(address: address.hex, components: state.components)
                        let response: MintResponse = try await Network.request(NFTEndpoint.mint(request))
                        print(response)
                    } else {
                        
                        let txId = try await fcl.mutate(cadence:
                    """
                    import NonFungibleToken from 0xNonFungibleToken
                    import MonsterMaker from 0xMonsterMaker
                    import MetadataViews from 0xMetadataViews
                    
                    // This transaction configures an account to hold Kitty Items.
                    
                    transaction {
                        prepare(signer: AuthAccount) {
                            // if the account doesn't already have a collection
                            if signer.borrow<&MonsterMaker.Collection>(from: MonsterMaker.CollectionStoragePath) == nil {
                    
                                // create a new empty collection
                                let collection <- MonsterMaker.createEmptyCollection()
                                
                                // save it to the account
                                signer.save(<-collection, to: MonsterMaker.CollectionStoragePath)
                    
                                // create a public capability for the collection
                                signer.link<&MonsterMaker.Collection{NonFungibleToken.CollectionPublic, MonsterMaker.MonsterMakerCollectionPublic, MetadataViews.ResolverCollection}>(MonsterMaker.CollectionPublicPath, target: MonsterMaker.CollectionStoragePath)
                            }
                        }
                    }
                    """,
                                                        args: [])
                        
                        print("txId ==> \(txId.hex)")
                        
                    }
                } catch {
                    print(error)
                }
            }
        }
    }
}
