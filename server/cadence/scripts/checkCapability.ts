const checkCapability = `
import NonFungibleToken from 0xNonFungibleToken
import MonsterMaker from 0xMonsterMaker

pub fun main(address: Address) : Bool {
    let account = getAccount(address)

    let vaultRef = account
    .getCapability<&{NonFungibleToken.CollectionPublic}>(MonsterMaker.CollectionPublicPath)
    .check()

    return vaultRef
}
`;

export default checkCapability;
