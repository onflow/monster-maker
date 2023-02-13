import MonsterMaker from "../contracts/MonsterMaker.cdc"

/// Transaction that links an NFTMinter at the specified path (if it doesn't already exist),
/// retrieves it, and publishes it for the specified recipient under the given name
///
transaction(capabilityName: String, capabilityPath: CapabilityPath, recipient: Address) {
    prepare(signer: AuthAccount) {
        if !signer.getCapability<&MonsterMaker.NFTMinter>(capabilityPath).check() {
            signer.unlink(capabilityPath)
            signer.link<&MonsterMaker.NFTMinter>(
                capabilityPath,
                target: MonsterMaker.MinterStoragePath
            )
        }
        let minterCap = signer.getCapability<&MonsterMaker.NFTMinter>(capabilityPath)
        signer.inbox.publish(
            minterCap,
            name: capabilityName,
            recipient: recipient
        )
    }
}