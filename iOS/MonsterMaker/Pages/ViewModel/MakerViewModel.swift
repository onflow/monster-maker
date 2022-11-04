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
        case .mint:
            
            if let address = fcl.currentUser?.addr.hex {
                let request = MintRequest(address: address, components: state.components)
                Task {
                    let response: MintResponse = try await Network.request(NFTEndpoint.mint(request))
                    print(response)
                }
            }
        }
    }
}
