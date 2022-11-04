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
    
    let screenWidth = UIScreen.main.bounds.width
    let width = UIScreen.main.bounds.width
    
    let defaultOffset: CGFloat = (UIScreen.main.bounds.width/5)
    
    var offset: CGFloat {
        switch position {
        case .legs:
            return defaultOffset * 1.5
        case .torso:
            return defaultOffset * 0.5
        case .head:
            return defaultOffset * -1
        case .background:
            return defaultOffset * -2
        }
    }
    
    var isBackground: Bool {
        position == .background
    }
    
    var body: some View {
        
        ZStack {
            Image(images[currentIndex])
                .resizable()
                .scaledToFit()
                .frame(width: isBackground ? screenWidth : width)
                .aspectRatio(1, contentMode: .fill)
                .allowsHitTesting(false)
            
            HStack {
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
                
                Spacer(minLength: width/2.5)
                
                
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
            .offset(x: 0, y: offset)
            .padding(.horizontal, isBackground ? 0 : 48)
        }
        .frame(maxWidth: .infinity)
    }
}

struct ComponentView_Previews: PreviewProvider {
    static var previews: some View {
    
        ZStack {
            ComponentView(images: NFTLocalImage.backgrounds, position: .background)
            ComponentView(images: NFTLocalImage.headers, position: .head)
            ComponentView(images: NFTLocalImage.legs, position: .legs)
            ComponentView(images: NFTLocalImage.torso, position: .torso)
        }
        .previewLayout(.sizeThatFits)
    }
}
