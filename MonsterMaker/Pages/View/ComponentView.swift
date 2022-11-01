//
//  ComponentView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI

struct ComponentView: View {
    
    var images: [String]
    
    @State
    var currentIndex: Int = 0
    
    var body: some View {
        
        HStack(spacing: 30) {
            
            Button {
                if currentIndex == 0 {
                    return
                }
                currentIndex = currentIndex - 1
            } label: {
                Image(systemName: currentIndex == 0 ? "arrowtriangle.backward" : "arrowtriangle.backward.fill")
                    .foregroundColor(.MM.grey)
                    .font(.system(size: 50))
            }
            
            Image(images[currentIndex])
//                .resizable()
//                .scaledToFit()
                .frame(width: UIScreen.main.bounds.width/2.5)
            
            Button {
                if currentIndex == images.count - 1 {
                    return
                }
                currentIndex = currentIndex + 1
            } label: {
                Image(systemName: currentIndex == images.count - 1  ? "arrowtriangle.forward":
                        "arrowtriangle.forward.fill")
                    .foregroundColor(.MM.grey)
                    .font(.system(size: 50))
            }
        }
        .frame(maxWidth: .infinity)
    }
    
    init(images: [String]) {
        currentIndex = Int.random(in: 0..<images.count)
        self.images = images
    }
}

struct ComponentView_Previews: PreviewProvider {
    static var previews: some View {
        ComponentView(images: [
            "head_1",
            "head_2",
            "head_3",
            "head_4",
            "head_5"
        ])
        .previewLayout(.sizeThatFits)
    }
}
