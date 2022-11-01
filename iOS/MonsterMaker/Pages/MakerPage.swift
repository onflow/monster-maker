//
//  MakerView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI


class NFTLocalImage {
    static var headers: [String] = {
        (1...5).compactMap { "head_\(String($0))"}
    }()
    
    static var legs: [String] = {
        (1...5).compactMap { "legs_\(String($0))"}
    }()
    
    static var torso: [String] = {
        (1...10).compactMap { "monster_torso_\(String($0))"}
    }()
}

struct MakerPage: View {
    
    @State
    var name: String = ""
    
    var body: some View {
        VStack {
            
            HeaderView(title: "Monster Maker")
            
            VStack(spacing: 24) {
                Spacer()
                VStack(spacing: 0) {
                    ComponentView(images: NFTLocalImage.headers)
                    ComponentView(images: NFTLocalImage.torso)
                    ComponentView(images: NFTLocalImage.legs)
                }
                
                Spacer()
                
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
            .padding(.bottom, 50)
            .padding(.horizontal, 24)
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
