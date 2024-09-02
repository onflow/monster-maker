const isInitialized = `
import NonFungibleToken from 0xNonFungibleToken
import MonsterMaker from 0xMonsterMaker

access(all) fun main(address: Address) : Bool {
    let account = getAccount(address)


    return account.capabilities.exists(MonsterMaker.CollectionPublicPath)
}
`;

export default isInitialized;
