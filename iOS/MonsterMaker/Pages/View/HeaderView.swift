//
//  HeaderView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI

struct HeaderView: View {
    
    var title: String
    
    var body: some View {
        HStack {
            Text(title)
                .font(.MM.body)
                .fontWeight(.semibold)
                .foregroundColor(.MM.dark)
                .textCase(.uppercase)
        }
        .frame(maxWidth: .infinity)
        .padding(.bottom, 12)
        .background(Color.MM.grey)
    }
}

struct HeaderView_Previews: PreviewProvider {
    static var previews: some View {
        HeaderView(title: "Monster Maker")
    }
}
