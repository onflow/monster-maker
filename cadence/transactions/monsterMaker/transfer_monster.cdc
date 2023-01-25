import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import MonsterMaker from "../../contracts/MonsterMaker.cdc"

// This transaction transfers a Monster from one account to another.

transaction(recipient: Address, withdrawID: UInt64) {
    let depositRef: &{NonFungibleToken.CollectionPublic}
 
    // https://developers.flow.com/cadence/language/transactions
    // The prepare phase is used when access to the private AuthAccount object of signing accounts is required for your transaction.
    
    prepare(signer: AuthAccount) {
        
        // get the recipients public account object
        let recipient = getAccount(recipient)

        // borrow a reference to the signer's NFT collection
        let collectionRef = signer.borrow<&MonsterMaker.Collection>(from: MonsterMaker.CollectionStoragePath)
            ?? panic("Could not borrow a reference to the owner's collection")

        // borrow a public reference to the receivers collection
        depositRef = recipient.getCapability(MonsterMaker.CollectionPublicPath)!.borrow<&{NonFungibleToken.CollectionPublic}>()!
    }
    
    // This phase is optional, but is recommended best practice to make intentions between parties explicit in code
    
    execute {

        // withdraw the NFT from the owner's collection
        let nft <- collectionRef.withdraw(withdrawID: withdrawID)

        // Deposit the NFT in the recipient's collection
        depositRef.deposit(token: <-nft)
    }
}
