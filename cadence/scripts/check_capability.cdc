import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import MonsterMaker from "../../contracts/MonsterMaker.cdc"

// This script verifies that the capability is available

access(all) fun main(address: Address) : Bool {
    let account: PublicAccount = getAccount(address)

    let vaultRef = account
        .capabilities.borrow<&{NonFungibleToken.CollectionPublic}>(MonsterMaker.CollectionPublicPath)
        

    return vaultRef.check()
}
