import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import MonsterMaker from "../../contracts/MonsterMaker.cdc"
import MetadataViews from "../../contracts/MetadataViews.cdc"

// This transaction configures an account to hold the Monster NFT collection

transaction {
    prepare(signer: AuthAccount) {
        // if the account doesn't already have a collection
        if signer.borrow<&MonsterMaker.Collection>(from: MonsterMaker.CollectionStoragePath) == nil {

            // create a new empty collection
            let collection <- MonsterMaker.createEmptyCollection()
            
            // save it to the account
            signer.save(<-collection, to: MonsterMaker.CollectionStoragePath)

            // create a public capability for the collection
            signer.link<&MonsterMaker.Collection{NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, MonsterMaker.MonsterMakerCollectionPublic, MetadataViews.ResolverCollection}>(MonsterMaker.CollectionPublicPath, target: MonsterMaker.CollectionStoragePath)
        }
    }
}
