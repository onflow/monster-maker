//
//  FlowClient.swift
//  MonsterMaker
//
//  Created by Hao Fu on 3/11/2022.
//

import Foundation
import FCL

class FlowClient {
    
    static func setup() {
        
//        let provider: FCL.Provider = .lilico
        let wallet = FCL.WalletProvider(id: "Dapper Pro",
                                          name: "Dapper Pro",
                                          method: .walletConnect,
                                          endpoint: "dapper-pro://",
                                          supportNetwork: [.testnet])
        
        let provider: FCL.Provider = .custom(wallet)
        
        let accountProof = FCL.Metadata.AccountProofConfig(appIdentifier: "Monster Maker",
                                                           nonce: "75f8587e5bd5f9dcc9909d0dae1f0ac5814458b2ae129620502cb936fde7120a")
        
        let walletConnect = FCL.Metadata.WalletConnectConfig(urlScheme: "monster-maker://", projectID: "c284f5a3346da817aeca9a4e6bc7f935")
        
        let metadata = FCL.Metadata(appName: "Monster Maker",
                                    appDescription: "Monster Maker Demo App for fcl",
                                    appIcon: URL(string: "https://i.imgur.com/jscDmDe.png")!,
                                    location: URL(string: "https://monster-maker.vercel.app/")!,
                                    accountProof: accountProof,
                                    walletConnectConfig: walletConnect)
        
        fcl.config(metadata: metadata,
                   env: .testnet,
                   provider: provider)

        fcl.config
            .put("0xFungibleToken", value: "0xf233dcee88fe0abe")
            .put("0xFUSD", value: "0x3c5959b568896393")
        
    }
    
    
}
