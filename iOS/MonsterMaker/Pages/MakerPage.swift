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
    
    var color: Color = Color.random
    
    @State
    var isShown: Bool = false
    
    @State
    var isRotate: Bool = false

    let animationDuration = 1.5
    
    var body: some View {
        VStack(spacing: .MM.zero) {
            
            HeaderView(title: "Monster Maker")
            
            VStack(spacing: .MM.double) {
                ZStack {
                    
                    ComponentView(images: NFTLocalImage.backgrounds,
                                  currentIndex: viewModel.state.components.background,
                                  position: .background)
                        .zIndex(998)
                    
                    ComponentView(images: NFTLocalImage.headers,
                                  currentIndex: viewModel.state.components.head,
                                  position: .head)
                        .zIndex(1000)
                    ComponentView(images: NFTLocalImage.torso,
                                  currentIndex: viewModel.state.components.torso,
                                  position: .torso)
                        .zIndex(1001)
                    ComponentView(images: NFTLocalImage.legs,
                                  currentIndex: viewModel.state.components.legs,
                                  position: .legs)
                        .zIndex(999)
                }
                .frame(maxWidth: .infinity)
                .aspectRatio(CGSize(width: 1, height: 1), contentMode: .fit)
                .padding(.horizontal, .MM.standard)
                
//                Spacer()
                
                VStack(spacing: .MM.double) {
                     
//                    TextField("Name", text: $name)
//                        .multilineTextAlignment(.center)
//                        .padding(.vertical, .MM.standard)
//                        .overlay {
//                            RoundedRectangle(cornerRadius: 16, style: .continuous)
//                                .stroke(Color.MM.dark, lineWidth: 5)
//                        }
//                        .tint(Color.MM.dark)
//                        .foregroundColor(Color.MM.dark)
//                        .font(.title.weight(.semibold))
//                        .frame(minHeight: .MM.xlarge)
                    
//                    PrimaryButtonView(title: "Mint") {
//                        viewModel.trigger(.mint)
//                    }
                    
                    Image("bar-mint")
//                        .transition(.offset(y: -500))
                        .offset(y: isShown ? 100 : 500)
                        .animation(.easeInOut(duration: animationDuration),
                                   value: isShown)
                        .rotationEffect(.degrees(isRotate ? 0 : 2),
                                        anchor: .bottom)
                        .animation(.easeInOut.repeatForever(autoreverses: true).delay(animationDuration),
                                   value: isRotate)
                    
                    
                }
                .padding(.horizontal, .MM.double)
            }
            .padding(.bottom, .MM.large)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background{
            LinearGradient(colors: [Color(hex: 0x061B20),
                                    Color(hex: 0x1C6470),
                                    Color(hex: 0xD3E549) ],
                           startPoint: .top,
                           endPoint: .bottom)
            .ignoresSafeArea()
        }
        .onAppear{
            isShown.toggle()
            isRotate.toggle()
        }
    }
}

struct MakerView_Previews: PreviewProvider {
    static var previews: some View {
        MakerPage()
    }
}
