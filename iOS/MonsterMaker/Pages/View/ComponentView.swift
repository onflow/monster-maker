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
    
    let defaultOffset: CGFloat = 250 / 5
    
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
    
    var imageHeight: CGFloat {
        isBackground ? 250 : 200
    }
    
    var body: some View {
        
        VStack(alignment: .center, spacing: 0) {
            
            Button {
                if currentIndex == 0 {
                    return
                }
                currentIndex = currentIndex - 1
            } label: {
                Image("arrow-up")
            }
            .visibility( !isBackground ? .gone : .visible)
            .offset(y: -.MM.zero)
            
            HStack {
                Button {
                    if currentIndex == 0 {
                        return
                    }
                    currentIndex = currentIndex - 1
                } label: {
                    Image("arrow-left")
                }
                .visibility( isBackground ? .gone : .visible)
                .offset(y: offset)
                
                
                ZStack {
                    Image(images[currentIndex])
                        .resizable()
                        .scaledToFit()
                        .frame(width: imageHeight, height: imageHeight)
                        .aspectRatio(1, contentMode: .fill)
                        .allowsHitTesting(false)
                        .zIndex(1100)
                }
//                .overlay{
//                    Image("bg")
//                        .resizable()
//                        .scaledToFit()
//                        .frame(width: 250, height: 250)
//                        .aspectRatio(1, contentMode: .fill)
//                }
                
                Button {
                    if currentIndex == images.count - 1 {
                        return
                    }
                    currentIndex = currentIndex + 1
                } label: {
                    Image("arrow-right")
                }
                .visibility( isBackground ? .gone : .visible)
                .offset(y: offset)
            }
            
            Button {
                if currentIndex == images.count - 1 {
                    return
                }
                currentIndex = currentIndex + 1
            } label: {
                Image("arrow-down")
            }
            .visibility( !isBackground ? .gone : .visible)
            .offset(y: .MM.standard)
            
        }
        .frame(width: .screenWidth)
    }
}

struct ComponentView_Previews: PreviewProvider {
    
    static let screenWidth = UIScreen.main.bounds.width
    
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
