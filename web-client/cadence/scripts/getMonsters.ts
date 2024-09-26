const getMonstersScript = `
    import NonFungibleToken from 0xNonFungibleToken
    import MetadataViews from 0xMetadataViews
    import MonsterMaker from 0xMonsterMaker

    access(all) struct Monster {
        access(all) let name: String
        access(all) let description: String
        access(all) let thumbnail: String
        access(all) let itemID: UInt64
        access(all) let resourceID: UInt64
        access(all) let owner: Address
        access(all) let component: &MonsterMaker.MonsterComponent

        init(
            name: String,
            description: String,
            thumbnail: String,
            itemID: UInt64,
            resourceID: UInt64,
            owner: Address,
            component: &MonsterMaker.MonsterComponent
        ) {
            self.name = name
            self.description = description
            self.thumbnail = thumbnail
            self.itemID = itemID
            self.resourceID = resourceID
            self.owner = owner
            self.component = component
        }
    }

    access(all) fun getMonsterById(address: Address, itemID: UInt64): Monster? {

        if let collection = getAccount(address).capabilities.get<&{NonFungibleToken.CollectionPublic, MonsterMaker.MonsterMakerCollectionPublic}>(MonsterMaker.CollectionPublicPath).borrow() {
            
            if let item = collection.borrowMonsterMaker(id: itemID) {

                if let view = item.resolveView(Type<MetadataViews.Display>()) {

                    let display = view as! MetadataViews.Display
                    
                    let owner: Address = item.owner!.address!

                    let thumbnail = display.thumbnail as! MetadataViews.HTTPFile     

                    
                    return Monster(
                        name: display.name,
                        description: display.description,
                        thumbnail: thumbnail.url,
                        itemID: itemID,
                        resourceID: item.uuid,
                        owner: address,
                        component: item.component
                    )
                }
            }
        }

        return nil
    }

    access(all) fun main(address: Address): [Monster] {
        let account = getAccount(address)
        let collectionRef = account.capabilities.get<&{NonFungibleToken.CollectionPublic}>(MonsterMaker.CollectionPublicPath)!.borrow()
            ?? panic("Could not borrow capability from public collection")
        
        let ids = collectionRef.getIDs()

        let monsters : [Monster] = []

        for id in ids {
            if let monster = getMonsterById(address: address, itemID: id) {
                monsters.append(monster)
            }
        }

        return monsters
    }
`;

export default getMonstersScript;
