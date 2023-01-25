## Token standards in this folder are not for deployment

For simplicity we copy the Flow core contract standards into the project folder here. This is to mitigate program
non-compilation since on-chain contract may be updated at any time. 

Developers should not deploy any of the following as their contract addresses won't be recognized by the 
eco-system standard on Flow. 

* FlowToken.cdc
* FungibleToken.cdc
* MetadataViews.cdc
* NFTCatalog.cdc
* NFTStorefrontV2.cdc
* NonFungibleToken.cdc

Applications should reference the above contracts by their deployed addresses. Detailed information is provided
in [Flow Core Contracts and Standards](https://developers.flow.com/flow/core-contracts)
