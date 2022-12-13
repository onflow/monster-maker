//
//  MakerViewModel.swift
//  MonsterMaker
//
//  Created by Hao Fu on 5/11/2022.
//

import Combine
import FCL
import Foundation
import UIKit

class MakerViewModel: ViewModel {
    @Published
    private(set) var state: MakerPage.ViewState = .init()

    func trigger(_ input: MakerPage.Action) {
        switch input {
        case let .updateIndex(index, position):
            updateSelection(index: index, position: position)
        case .mint:
            mintNFT()
        case .buy:
            buyNFT()
        }
    }

    private func buyNFT() {
        guard let user = fcl.currentUser else {
            return
        }

        UIImpactFeedbackGenerator(style: .heavy).impactOccurred()

        Task {
            do {
                setMintState(true)
                let txId = try await fcl.mutate(
                    cadence: MonsterMakerCadence.mintMonster,
                    args: [
                        .int(state.components.background),
                        .int(state.components.head),
                        .int(state.components.torso),
                        .int(state.components.legs),
                        .ufix64(0.0),
                    ],
                    gasLimit: 999,
                    authorizors: [user, MinterHelper.shared]
                )
                setMintState(false)
                print("txId ==> \(txId)")
                FlowManager.shared.subscribeTransaction(txId: txId.hex)
            } catch {
                setMintState(false)
                print(error)
            }
        }
    }

    private func mintNFT() {
        guard let user = fcl.currentUser else {
            return
        }

        UIImpactFeedbackGenerator(style: .light).impactOccurred()

        Task {
            do {
                setMintState(true)
                let request = MintRequest(address: user.addr.hex, components: state.components)
                let response: MintResponse = try await Network.request(NFTEndpoint.mint(request))
                print("txId ==> \(response.txId)")
                setMintState(false)
                FlowManager.shared.subscribeTransaction(txId: response.txId)
            } catch {
                setMintState(false)
                print(error)
            }
        }
    }

    private func setMintState(_ isMinting: Bool) {
        Task { @MainActor in
            state.isMiniting = isMinting
        }
    }

    private func updateSelection(index: Int, position: NFTComponent) {
        Task { @MainActor in
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
