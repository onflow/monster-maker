//
//  MakerView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI

struct MakerPage: View {
    
    let headerImages = [
        "head_1",
        "head_2",
        "head_3",
        "head_4",
        "head_5"
    ]
    
    let legImages = [
        "legs_1",
        "legs_2",
        "legs_3",
        "legs_4",
        "legs_5"
    ]
    
    let torsoImages = [
        "monster_torso_1",
        "monster_torso_2",
        "monster_torso_3",
        "monster_torso_4",
        "monster_torso_5",
        "monster_torso_6",
        "monster_torso_7",
        "monster_torso_8",
        "monster_torso_9",
        "monster_torso_10",
    ]
    
    @State
    var name: String = ""
    
    var body: some View {
        VStack(spacing: 24) {
            Spacer()
            VStack(spacing: 0) {
                ComponentView(images: headerImages)
                ComponentView(images: torsoImages)
                ComponentView(images: legImages)
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
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color.MM.background)
    }
}

struct MakerView_Previews: PreviewProvider {
    static var previews: some View {
        MakerPage()
    }
}
