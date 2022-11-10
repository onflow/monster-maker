//
//  HeaderView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI
import FCL

struct HeaderView: View {
    
    var title: String
    
    var body: some View {
        HStack {
            
            Button {} label: {}
            .frame(width: 50)
            
            Spacer()
            
            Image("logo")
                .resizable()
                .scaledToFit()
                .frame(height: 50)
            
            Spacer()
            
            Button {
                fcl.unauthenticate()
            } label: {
                Image("exit")
            }
            .frame(width: 50)
            
        }
        .frame(maxWidth: .infinity)
        .frame(height: 56)
        .padding(.horizontal, .MM.standard)
        .background(.clear)
    }
}

struct HeaderView_Previews: PreviewProvider {
    static var previews: some View {
        HeaderView(title: "Monster Maker")
    }
}
