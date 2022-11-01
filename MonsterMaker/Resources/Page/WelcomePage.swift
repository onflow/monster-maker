//
//  ContentView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI

struct WelcomePage: View {
    var body: some View {
        VStack {
            Spacer()
            Text("Master \n Maker")
                .font(.custom("Montserrat", size: 60).weight(.regular))
                .textCase(.uppercase)
                .foregroundColor(Color.MM.dark)
            
            
            Spacer()
            
            PrimaryButtonView(title: "Connect") {
                
            }
            .padding(.bottom, 24)
            
        }
        .padding()
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        WelcomePage()
    }
}
