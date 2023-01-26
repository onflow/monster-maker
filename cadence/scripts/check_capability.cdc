import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import MonsterMaker from "../../contracts/MonsterMaker.cdc"

// This script verifies that the capability is available

pub fun main(address: Address) : Bool {
    let account = getAccount(address)

    let vaultRef = account
        .getCapability<&{NonFungibleToken.CollectionPublic}>(MonsterMaker.CollectionPublicPath)
        .check()

    return vaultRef
}
