import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import MonsterMaker from "../../contracts/MonsterMaker.cdc"

// This script returns the size of an account's MonsterMaker collection.

pub fun main(address: Address): Int {
    let account = getAccount(address)

    let collectionRef = account.getCapability(MonsterMaker.CollectionPublicPath)!
        .borrow<&{NonFungibleToken.CollectionPublic}>()
        ?? panic("Could not borrow capability from public collection")
    
    return collectionRef.getIDs().length
}
