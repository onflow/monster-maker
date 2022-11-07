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
            
            Button {
                
            } label: {
            }
            .frame(width: 56)
            
            Spacer()
            
            Image("logo")
                .resizable()
                .scaledToFit()
                .frame(height: 60)
            
            Spacer()
            
            Button {
                
            } label: {
                Image("exit")
            }
            .frame(width: 56)
            
            
//            Text( fcl.currentUser?.addr.hex ?? title)
//                .font(.MM.body)
//                .fontWeight(.semibold)
//                .foregroundColor(.MM.dark)
//                .textCase(.uppercase)
//                .padding(.vertical, 10)
            
            
//            Spacer()
//
//            if let _ = fcl.currentUser?.addr.hex {
//                Button {
//                    //
//                } label: {
//                    Image(systemName: "rectangle.portrait.and.arrow.right.fill")
//                        .foregroundColor(.MM.dark)
//                        .font(.largeTitle)
//                }
//            }
            
        }
        .frame(maxWidth: .infinity)
        .frame(height: 80)
        .padding(.horizontal, .MM.standard)
//        .padding(.top, .MM.medium)
        .background(.clear)
    }
}

struct HeaderView_Previews: PreviewProvider {
    static var previews: some View {
        HeaderView(title: "Monster Maker")
    }
}
