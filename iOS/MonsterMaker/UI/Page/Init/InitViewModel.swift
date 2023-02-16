//
//  MakerViewModel.swift
//  MonsterMaker
//
//  Created by Hao Fu on 5/11/2022.
//

import FCL
import Foundation

class InitViewModel: ViewModel {
    @Published
    private(set) var state: InitPage.ViewState = .init()

    func trigger(_ input: InitPage.Action) {
        switch input {
        case .initialize:
            initNFT()
        }
    }

    private func initNFT() {
        Task {
            do {
                let txId = try await fcl.mutate(cadence: MonsterMakerCadence.initAccount)
                print("txId ==> \(txId.hex)")
                FlowManager.shared.subscribeTransaction(txId: txId.hex)
            } catch {
                print(error)
            }
        }
    }
}
