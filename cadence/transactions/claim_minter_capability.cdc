import MonsterMaker from "../contracts/MonsterMaker.cdc"

/// Transaction that retrieves an NFTMinter from specified provider with the given name
/// and stores it at the specified path.
///
transaction(capabilityName: String, storagePath: StoragePath, provider: Address) {
    
    prepare(signer: AuthAccount) {
        let minterCap = signer.inbox.claim<&MonsterMaker.NFTMinter>(
            capabilityName,
            provider: provider
        ) ?? panic("No published Capability with given name available from provider ".concat(provider.toString()))

        signer.save(minterCap, to: storagePath)
    }
}