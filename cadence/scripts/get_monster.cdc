import NonFungibleToken from "../../contracts/NonFungibleToken.cdc"
import MetadataViews from "../../contracts/MetadataViews.cdc"
import MonsterMaker from "../../contracts/MonsterMaker.cdc"

// We use a struct here to collate results and get nice JSON payload in the response
access(all)struct Monster {
    access(all)let name: String
    access(all)let description: String
    access(all)let thumbnail: String

    access(all)let itemID: UInt64
    access(all)let resourceID: UInt64
    access(all)let owner: Address

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

access(all)fun dwebURL(_ file: MetadataViews.IPFSFile): String {
    var url = "https://"
        .concat(file.cid)
        .concat(".ipfs.dweb.link/")
    
    if let path = file.path {
        return url.concat(path)
    }
    
    return url
}

access(all)fun main(address: Address, itemID: UInt64): Monster? {
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
