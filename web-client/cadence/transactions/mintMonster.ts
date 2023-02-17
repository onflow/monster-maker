const mintMonster = `import NonFungibleToken from 0xNonFungibleToken
import MonsterMaker from 0xMonsterMaker
import MetadataViews from 0xMetadataViews
import FungibleToken from 0xFungibleToken
import FlowToken from 0xFlowToken

// This transction uses the NFTMinter resource to mint a new NFT.
//
// It must be run with the account that has the minter resource
// stored at path /storage/NFTMinter.

transaction(
    background: Int,
    head: Int,
    torso: Int,
    leg: Int,
    price: UFix64
) {

    // local variable for storing the minter reference
    let minter: &MonsterMaker.NFTMinter

    /// Reference to the receiver's collection
    let recipientCollectionRef: &{NonFungibleToken.CollectionPublic}

    /// Previous NFT ID before the transaction executes
    let mintingIDBefore: UInt64

    // The Vault resource that holds the tokens that are being transfered
    let sentVault: @FungibleToken.Vault

    // The Minter will receive the FungibleToken
    let minterReceiver: &{FungibleToken.Receiver}

    prepare(minter: AuthAccount, recipient: AuthAccount) {
        self.mintingIDBefore = MonsterMaker.totalSupply

        // if the account doesn't already have a collection
        if recipient.borrow<&MonsterMaker.Collection>(from: MonsterMaker.CollectionStoragePath) == nil {

            // create a new empty collection
            let collection <- MonsterMaker.createEmptyCollection()

            // save it to the account
            recipient.save(<-collection, to: MonsterMaker.CollectionStoragePath)

            // create a public capability for the collection
            recipient.link<&MonsterMaker.Collection{NonFungibleToken.CollectionPublic, MonsterMaker.MonsterMakerCollectionPublic, MetadataViews.ResolverCollection}>(MonsterMaker.CollectionPublicPath, target: MonsterMaker.CollectionStoragePath)
        }


        // Borrow a reference to the NFTMinter resource in storage
        self.minter = minter.borrow<&MonsterMaker.NFTMinter>(from: MonsterMaker.MinterStoragePath)
            ?? panic("Could not borrow a reference to the NFT minter")

        // Borrow the recipient's public NFT collection reference
        self.recipientCollectionRef = recipient
            .getCapability(MonsterMaker.CollectionPublicPath)
            .borrow<&{NonFungibleToken.CollectionPublic}>()
            ?? panic("Could not get receiver reference to the NFT Collection")

        // Get a reference to the minter's Receiver
        self.minterReceiver = minter.getCapability(/public/flowTokenReceiver)!
            .borrow<&{FungibleToken.Receiver}>()
            ?? panic("Could not borrow receiver reference to the recipient's Vault")

        // Get a reference to the recipient's stored vault
        let vaultRef = recipient.borrow<&FlowToken.Vault>(from: /storage/flowTokenVault)
            ?? panic("Could not borrow reference to the owner's Vault!")

        // Withdraw tokens from the signer's stored vault
        self.sentVault <- vaultRef.withdraw(amount: price)
    }

    execute {
        let componentValue = MonsterMaker.MonsterComponent(background: background, head: head, torso: torso, leg: leg)

        // TODO: Add royalty feature to MM using beneficiaries, cuts, and descriptions. At the moment, we don't provide royalties with KI, so this will be an empty list.
        let royalties: [MetadataViews.Royalty] = []

        // mint the NFT and deposit it to the recipient's collection
        self.minter.mintNFT(
            recipient: self.recipientCollectionRef,
            component: componentValue,
            royalties: royalties
        )

        // Deposit the withdrawn tokens in the recipient's receiver
        self.minterReceiver.deposit(from: <-self.sentVault)
    }

    post {
        MonsterMaker.totalSupply == self.mintingIDBefore + 1: "The total supply should have been increased by 1"
    }
}`;

export default mintMonster;
