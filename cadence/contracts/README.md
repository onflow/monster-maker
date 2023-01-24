## Token standards in this folder are not for deployment

For simplicity we copy the Flow core contract standards into the project folder here. This is to mitigate any risk
of the project breaking if the example code links to on-chain contract addresses and those contracts get updated.

Real projects should not deploy any of the following:

* FlowToken.cdc
* FungibleToken.cdc
* MetadataViews.cdc
* NFTCatalog.cdc
* NFTStorefrontV2.cdc
* NonFungibleToken.cdc

Applications will instead reference the deployed token contracts, for which more information is provided at Flow 
Core Contracts and Standards please see: https://developers.flow.com/flow/core-contracts
