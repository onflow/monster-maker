//
//  PrimaryButtonView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI

struct PrimaryButtonView: View {
    
    var title: String
    var action: () -> Void
    
    var body: some View {
        Button(title) {
            action()
        }
        .font(.custom("Montserrat", size: 32).weight(.bold))
        .padding(.horizontal, .MM.double)
        .padding(.vertical, .MM.standard)
        .frame(maxWidth: .infinity, alignment: .center)
        .background(Color.MM.dark)
        .foregroundColor(.MM.white)
        .cornerRadius(.MM.medium)
        .textCase(.uppercase)
        .frame(minHeight: .MM.xlarge)
    }
}

struct PrimaryButtonView_Previews: PreviewProvider {
    static var previews: some View {
        PrimaryButtonView(title: "Connect") {}
    }
}
