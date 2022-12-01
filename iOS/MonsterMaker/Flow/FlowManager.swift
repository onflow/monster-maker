//
//  FlowClient.swift
//  MonsterMaker
//
//  Created by Hao Fu on 3/11/2022.
//

import Foundation
import FCL
import Flow
import UIKit

class FlowManager: ObservableObject {
    
    static let shared = FlowManager()
    
    lazy var nonce: String = {
        let letters = "abcdefghijklmnopqrstuvwxyz0123456789"
        return String((0..<64).map{ _ in letters.randomElement()! })
    }()
    
    @Published
    var pendingTx: String? = nil
    
    func subscribeTransaction(txId: String) {        
        Task {
            do {
                let id = Flow.ID(hex: txId)
                DispatchQueue.main.async {
                    self.pendingTx = txId
                }
                let _ = try await id.onceSealed()
                await UIImpactFeedbackGenerator(style: .light).impactOccurred()
                DispatchQueue.main.async {
                    self.pendingTx = nil
                }
            } catch {
                DispatchQueue.main.async {
                    self.pendingTx = nil
                }
            }
        }
    }
    
    func setup() {
        let defaultProvider: FCL.Provider = .dapperPro
        let defaultNetwork: Flow.ChainID = .testnet
        let accountProof = FCL.Metadata.AccountProofConfig(appIdentifier: "Monster Maker",
                                                           nonce: nonce)
        let walletConnect = FCL.Metadata.WalletConnectConfig(urlScheme: "monster-maker://", projectID: "12ed93a2aae83134c4c8473ca97d9399")
        let metadata = FCL.Metadata(appName: "Monster Maker",
                                    appDescription: "Monster Maker Demo App for fcl",
                                    appIcon: URL(string: "https://i.imgur.com/jscDmDe.png")!,
                                    location: URL(string: "https://monster-maker.vercel.app/")!,
                                    accountProof: accountProof,
                                    walletConnectConfig: walletConnect)
        fcl.config(metadata: metadata,
                   env: defaultNetwork,
                   provider: defaultProvider)

        fcl.config
            .put("0xFungibleToken", value: "0x631e88ae7f1d7c20")
            .put("0xMonsterMaker", value: "0xfd3d8fe2c8056370")
            .put("0xMetadataViews", value: "0x631e88ae7f1d7c20")
            .put("0xTransactionGeneration", value: "0x44051d81c4720882")
    }
    
    func checkCollectionVault() async throws -> Bool {
        guard let address = fcl.currentUser?.addr else {
            throw FCLError.unauthenticated
        }
        
        do {
            let result: Bool = try await fcl.query(script: MonsterMakerCadence.checkInit,
                                       args: [.address(address)]).decode()
            return result
        } catch {
            print(error)
            throw error
        }
    }
    
}
