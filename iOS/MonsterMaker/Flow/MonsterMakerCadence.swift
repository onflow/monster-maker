//
//  Cadence.swift
//  MonsterMaker
//
//  Created by Hao Fu on 11/11/2022.
//

import Foundation

class MonsterMakerCadence {
    
    static let initAccount =
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
    """
    
    static let checkInit =
    """
        import NonFungibleToken from 0xNonFungibleToken
        import MonsterMaker from 0xMonsterMaker
        
        pub fun main(address: Address) : Bool {
            let account = getAccount(address)
    
            let vaultRef = account
            .getCapability<&{NonFungibleToken.CollectionPublic}>(MonsterMaker.CollectionPublicPath)
            .check()
    
            return vaultRef
        }
    """
    
    static let nftList =
    """
    pub struct Monster {
        pub let name: String
        pub let description: String
        pub let thumbnail: String
        pub let itemID: UInt64
        pub let resourceID: UInt64
        pub let owner: Address
        pub let component: MonsterMaker.MonsterComponent

        init(
            name: String,
            description: String,
            thumbnail: String,
            itemID: UInt64,
            resourceID: UInt64,
            owner: Address,
            component: MonsterMaker.MonsterComponent
        ) {
            self.name = name
            self.description = description
            self.thumbnail = thumbnail
            self.itemID = itemID
            self.resourceID = resourceID
            self.owner = owner
            self.component = component
        }
    }

    pub fun getMonsterById(address: Address, itemID: UInt64): Monster? {

        if let collection = getAccount(address).getCapability<&MonsterMaker.Collection{NonFungibleToken.CollectionPublic, MonsterMaker.MonsterMakerCollectionPublic}>(MonsterMaker.CollectionPublicPath).borrow() {
            
            if let item = collection.borrowMonsterMaker(id: itemID) {

                if let view = item.resolveView(Type<MetadataViews.Display>()) {

                    let display = view as! MetadataViews.Display
                    
                    let owner: Address = item.owner!.address!

                    let thumbnail = display.thumbnail as! MetadataViews.HTTPFile

                    
                    return Monster(
                        name: display.name,
                        description: display.description,
                        thumbnail: thumbnail.url,
                        itemID: itemID,
                        resourceID: item.uuid,
                        owner: address,
                        component: item.component
                    )
                }
            }
        }

        return nil
    }

    pub fun main(address: Address): [Monster] {
        let account = getAccount(address)
        let collectionRef = account.getCapability(MonsterMaker.CollectionPublicPath)!.borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not borrow capability from public collection")
        
        let ids = collectionRef.getIDs()

        let monsters : [Monster] = []

        for id in ids {
            if let monster = getMonsterById(address: address, itemID: id) {
                monsters.append(monster)
            }
        }

        return monsters
    }
    """
}
