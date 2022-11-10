//
//  MakerViewModel.swift
//  MonsterMaker
//
//  Created by Hao Fu on 5/11/2022.
//

import Foundation
import FCL

class MakerViewModel: ViewModel {
    @Published
    private(set) var state: MakerPage.ViewState = .init()
    
    func trigger(_ input: MakerPage.Action) {
        switch input {
        case let .updateIndex(index, position):
            updateSelection(index: index, position: position)
        case .mint:
            mintNFT()
        }
    }
    
    private func mintNFT() {
        guard let address = fcl.currentUser?.addr else {
            return
        }
        
        Task {
            do {
                let isEnabled = try await FlowManager.shared.checkCollectionVault()
                if isEnabled {
                    let request = MintRequest(address: address.hex, components: state.components)
                    let response: MintResponse = try await Network.request(NFTEndpoint.mint(request))
                    print("txId ==> \(response.txId)")
                    FlowManager.shared.subscribeTransaction(txId: response.txId)
                } else {
                    let txId = try await fcl.mutate(cadence: MonsterMakerCadence.initAccount,
                                                    args: [])
                    print("txId ==> \(txId.hex)")
                    FlowManager.shared.subscribeTransaction(txId: txId.hex)
                }
            } catch {
                print(error)
            }
        }
    }
    
    private func updateSelection(index: Int, position: NFTComponent) {
        DispatchQueue.main.async {
            switch position {
            case .background:
                self.state.components.background = index
            case .legs:
                self.state.components.legs = index
            case .head:
                self.state.components.head = index
            case .torso:
                self.state.components.torso = index
            }
            
        }
    }
}
