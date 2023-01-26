import MonsterMaker from "../../contracts/MonsterMaker.cdc"

// This scripts returns the number of MonsterMaker currently in existence.

pub fun main(): UInt64 {    
    return MonsterMaker.totalSupply
}
