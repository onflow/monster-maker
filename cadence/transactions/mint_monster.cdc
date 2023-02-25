import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import MonsterMaker from "../../contracts/MonsterMaker.cdc"
import MetadataViews from "../../contracts/MetadataViews.cdc"
import FungibleToken from "../../contracts/FungibleToken.cdc"

// This transction uses the NFTMinter resource to mint a new NFT.
//
// It must be run with the account that has the minter resource
// stored at path /storage/NFTMinter.

transaction(
    recipient: Address, 
    background: Int,
    head: Int,
    torso: Int, 
    leg: Int
) {

    // local variable for storing the minter reference
    let minter: &MonsterMaker.NFTMinter

    /// Reference to the receiver's collection
    let recipientCollectionRef: &{NonFungibleToken.CollectionPublic}

    /// Previous NFT ID before the transaction executes
    let mintingIDBefore: UInt64

    prepare(signer: AuthAccount) {
        self.mintingIDBefore = MonsterMaker.totalSupply

        // Borrow a reference to the NFTMinter resource in storage
        self.minter = signer.borrow<&MonsterMaker.NFTMinter>(from: MonsterMaker.MinterStoragePath)
            ?? panic("Could not borrow a reference to the NFT minter")

        // Borrow the recipient's public NFT collection reference
        self.recipientCollectionRef = getAccount(recipient)
            .getCapability(MonsterMaker.CollectionPublicPath)
            .borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not get receiver reference to the NFT Collection")
    }

    execute {
        let componentValue = MonsterMaker.MonsterComponent(background: background, head: head, torso: torso, leg: leg)

        // TODO: Add royalty feature to KI using beneficiaries, cuts, and descriptions. At the moment, we don't provide royalties with KI, so this will be an empty list.
        let royalties: [MetadataViews.Royalty] = []

        // mint the NFT and deposit it to the recipient's collection
        self.minter.mintNFT(
            recipient: self.recipientCollectionRef,
            component: componentValue,
            royalties: royalties
        )
    }

    post {
        MonsterMaker.totalSupply == self.mintingIDBefore + 1: "The total supply should have been increased by 1"
    }
}
 