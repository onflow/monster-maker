//
//  MakerView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI


struct MakerPage: View {
    
    @State
    var name: String = ""
    
    var color: Color = Color.random
    
    var body: some View {
        VStack {
            
            HeaderView(title: "Monster Maker")
            
            VStack(spacing: .MM.double) {
                Spacer()
                ZStack {
                    
                    ComponentView(images: NFTLocalImage.backgrounds, position: .background)
                        .zIndex(998)
                    
                    ComponentView(images: NFTLocalImage.headers, position: .head)
                        .zIndex(1000)
                    ComponentView(images: NFTLocalImage.torso, position: .torso)
                        .zIndex(1001)
                    ComponentView(images: NFTLocalImage.legs, position: .leg)
                        .zIndex(999)
                }
                .frame(maxWidth: .infinity)
//                .aspectRatio(CGSize(width: 1, height: 1), contentMode: .fit)
                .padding(.horizontal, .MM.standard)
                
                Spacer()
                
                VStack(spacing: .MM.double) {
                    TextField("Name", text: $name)
                        .multilineTextAlignment(.center)
                        .padding(.vertical, 12)
                        .overlay {
                            RoundedRectangle(cornerRadius: 16, style: .continuous)
                                .stroke(Color.MM.dark, lineWidth: 5)
                        }
                        .tint(Color.MM.dark)
                        .foregroundColor(Color.MM.dark)
                        .font(.title.weight(.semibold))
                    
                    PrimaryButtonView(title: "Mint") {
                        
                    }
                    
                }
                .padding(.horizontal, .MM.double)
            }
            .padding(.bottom, .MM.large)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.MM.background)
    }
}

struct MakerView_Previews: PreviewProvider {
    static var previews: some View {
        MakerPage()
    }
}
