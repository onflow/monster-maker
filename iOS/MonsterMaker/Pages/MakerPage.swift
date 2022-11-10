//
//  MakerView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI

extension MakerPage {
    struct ViewState {
        var name: String = ""
        var components: NFTLocalData = .init(background: NFTLocalImage.backgrounds.randomIndex,
                                             head: NFTLocalImage.headers.randomIndex,
                                             torso: NFTLocalImage.torso.randomIndex,
                                             legs: NFTLocalImage.legs.randomIndex)
    }

    enum Action {
        case mint
    }
}


struct MakerPage: View {
    
    @StateObject
    var viewModel = MakerViewModel()
    
    @State
    var name: String = ""
    
    @State
    var isShown: Bool = false
    
    @State
    var isRotate: Bool = false

    let animationDuration = 1.5
    
    var body: some View {
        VStack(spacing: .MM.zero) {
            
            HeaderView(title: "Monster Maker")
            Spacer()
                ZStack {
                    
                    ComponentView(images: NFTLocalImage.backgrounds,
                                  currentIndex: Int(viewModel.state.components.background),
                                  position: .background)
                        .zIndex(998)

                    ComponentView(images: NFTLocalImage.headers,
                                  currentIndex: Int(viewModel.state.components.head),
                                  position: .head)
                        .zIndex(1000)
                    ComponentView(images: NFTLocalImage.torso,
                                  currentIndex: Int(viewModel.state.components.torso),
                                  position: .torso)
                        .zIndex(1001)
                    ComponentView(images: NFTLocalImage.legs,
                                  currentIndex: Int(viewModel.state.components.legs),
                                  position: .legs)
                        .zIndex(999)
                }
                .frame(maxWidth: .infinity)
                .aspectRatio(CGSize(width: 1, height: 1), contentMode: .fit)
                .padding(.horizontal, .MM.standard)
                
                Spacer()
                    
                Button {
                    viewModel.trigger(.mint)
                } label: {
                    
                    Image("bar-mint")
                        .resizable()
                        .scaledToFit()
                        .offset(y: isShown ? 50 : 500)
                        .animation(.easeInOut(duration: animationDuration),
                                   value: isShown)
                        .rotationEffect(.degrees(isRotate ? 0 : 2),
                                        anchor: .bottom)
                        .animation(.easeInOut
                            .repeatForever(autoreverses: true)
                            .delay(animationDuration),
                                   value: isRotate)
                }
        }
        .frame(maxWidth: .screenWidth, maxHeight: .infinity)
        .mmBackground()
        .onAppear{
            isShown = true
            isRotate.toggle()
        }
    }
}

struct MakerView_Previews: PreviewProvider {
    static var previews: some View {
        MakerPage()
    }
}
