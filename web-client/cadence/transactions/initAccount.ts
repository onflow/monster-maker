const initAccount = `
    import NonFungibleToken from 0xNonFungibleToken
    import MonsterMaker from 0xMonsterMaker
    import MetadataViews from 0xMetadataViews

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
`;

export default initAccount;
