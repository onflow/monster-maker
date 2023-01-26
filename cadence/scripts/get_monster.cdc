import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import MetadataViews from "../../contracts/MetadataViews.cdc"
import MonsterMaker from "../../contracts/MonsterMaker.cdc"

// We use a struct here to collate results and get nice JSON payload in the response
pub struct Monster {
    pub let name: String
    pub let description: String
    pub let thumbnail: String

    pub let itemID: UInt64
    pub let resourceID: UInt64
    pub let owner: Address

    init(
        name: String,
        description: String,
        thumbnail: String,
        itemID: UInt64,
        resourceID: UInt64,
        owner: Address,
    ) {
        self.name = name
        self.description = description
        self.thumbnail = thumbnail

        self.itemID = itemID
        self.resourceID = resourceID
        self.owner = owner
    }
}

pub fun dwebURL(_ file: MetadataViews.IPFSFile): String {
    var url = "https://"
        .concat(file.cid)
        .concat(".ipfs.dweb.link/")
    
    if let path = file.path {
        return url.concat(path)
    }
    
    return url
}

pub fun main(address: Address, itemID: UInt64): Monster? {
    if let collection = getAccount(address).
        getCapability<&MonsterMaker.Collection{NonFungibleToken.CollectionPublic, 
            MonsterMaker.MonsterMakerCollectionPublic}>(MonsterMaker.CollectionPublicPath).
            borrow() {
        
        if let item = collection.borrowMonsterMaker(id: itemID) {

            if let view = item.resolveView(Type<MetadataViews.Display>()) {

                let display = view as! MetadataViews.Display
                
                let owner: Address = item.owner!.address!

                let ipfsThumbnail = display.thumbnail as! MetadataViews.HTTPFile     

                return Monster(
                    name: display.name,
                    description: display.description,
                    thumbnail: ipfsThumbnail.url,
                    itemID: itemID,
                    resourceID: item.uuid,
                    owner: address,
                )
            }
        }
    }

    return nil
}
