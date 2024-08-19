import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import MonsterMaker from "../../contracts/MonsterMaker.cdc"
import MetadataViews from "../../contracts/MetadataViews.cdc"

// This transaction configures an account to hold the Monster NFT collection

transaction {
    prepare(signer: auth(Capabilities, Storage,BorrowValue) &Account) {
        // if the account doesn't already have a collection
        if signer.storage.borrow<&MonsterMaker.Collection>(from: MonsterMaker.CollectionStoragePath) == nil {

            // create a new empty collection
            let collection <- MonsterMaker.createEmptyCollection(nftType: Type<@MonsterMaker.NFT>())
            
            // save it to the account
            signer.storage.save(<-collection, to: MonsterMaker.CollectionStoragePath)

            let collectionCap = signer.capabilities.storage.issue<&{NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, MonsterMaker.MonsterMakerCollectionPublic}>(MonsterMaker.CollectionStoragePath)
            signer.capabilities.publish(collectionCap, at: MonsterMaker.CollectionPublicPath)

        }
    }
}
