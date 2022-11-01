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
    
    var position: NFTComponent = .head
    
    let width = UIScreen.main.bounds.width/2.5
    
    let defaultOffset: CGFloat = (UIScreen.main.bounds.width/5)
    
    var offset: CGFloat {
        switch position {
        case .leg:
            return defaultOffset * 1.2
        case .torso:
            return defaultOffset * 0.5
        case .head:
            return defaultOffset * -0.5
        }
    }
    
    var body: some View {
        
        ZStack {
            Image(images[currentIndex])
                .frame(width: width)
            
//            VStack(spacing: 0) {
//            }
            
            HStack {
//                Spacer()
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
                
                Spacer(minLength: width)
                
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
                
//                Spacer()
            }
            .offset(x: 0, y: offset)
            
        }
        .frame(maxWidth: .infinity)
    }
    
    init(images: [String], position: NFTComponent = .head) {
        currentIndex = Int.random(in: 0..<images.count)
        self.images = images
        self.position = position
    }
}

struct ComponentView_Previews: PreviewProvider {
    static var previews: some View {
        
        ZStack {
            ComponentView(images: NFTLocalImage.headers)
            ComponentView(images: NFTLocalImage.torso, position: .torso)
            ComponentView(images: NFTLocalImage.legs, position: .leg)
        }
        .previewLayout(.sizeThatFits)
    }
}
