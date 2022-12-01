//
//  MakerView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI

extension MakerPage {
    struct ViewState {
        var isMiniting: Bool = false
        var components: NFTLocalData = .init(background: NFTLocalImage.backgrounds.randomIndex,
                                             head: NFTLocalImage.headers.randomIndex,
                                             torso: NFTLocalImage.torso.randomIndex,
                                             legs: NFTLocalImage.legs.randomIndex)
    }

    enum Action {
        case mint
        case buy
        case updateIndex(Int, NFTComponent)
    }
}


struct MakerPage: View {
    
    @StateObject
    var vm:AnyViewModel<ViewState, Action>
    
    @State
    var isShown: Bool = false
    
    @State
    var isRotate: Bool = false
    
    @State
    var isPending: Bool = false
    
    @State
    var isShowFlight: Bool = false

    let animationDuration = 1.5
    
    var body: some View {
        VStack(spacing: .MM.zero) {
            HeaderView()
            Spacer()
                ZStack {
                    ComponentView(images: NFTLocalImage.backgrounds,
                                  currentIndex: .init(get: { vm.components.background },
                                                      set: { vm.trigger(.updateIndex($0, .background)) }),
                                  position: .background)
                        .zIndex(998)

                    ComponentView(images: NFTLocalImage.headers,
                                  currentIndex: .init(get: { vm.components.head },
                                                      set: { vm.trigger(.updateIndex($0, .head)) }),
                                  position: .head)
                        .zIndex(1000)
                    ComponentView(images: NFTLocalImage.torso,
                                  currentIndex: .init(get: { vm.components.torso },
                                                      set: { vm.trigger(.updateIndex($0, .torso)) }),
                                  position: .torso)
                        .zIndex(1001)
                    ComponentView(images: NFTLocalImage.legs,
                                  currentIndex: .init(get: { vm.components.legs },
                                                      set: { vm.trigger(.updateIndex($0, .legs)) }),
                                  position: .legs)
                        .zIndex(999)
                }
                .frame(maxWidth: UIScreen.main.bounds.width)
                .aspectRatio(CGSize(width: 1, height: 1), contentMode: .fit)
                .padding(.horizontal, .MM.standard)
                
                Spacer()
            
            if isPending || vm.isMiniting {
                Image("minting-banner")
                    .resizable()
                    .scaledToFit()
                    .offset(y: isShowFlight ? -30 : -50)
                    .transition(.move(edge: .bottom))
                    .animation(.easeInOut(duration: 1.0).repeatForever(autoreverses: true),
                               value: isShowFlight)
                    .onAppear {
                        isShowFlight.toggle()
                    }
                
            } else {
                Button {
                    vm.trigger(.buy)
                } label: {
                    Image("bar-mint")
                        .resizable()
                        .scaledToFit()
                        .offset(y: isShown ? UIScreen.main.bounds.height * 0.02 : 500)
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
        }
        .frame(maxWidth: .screenWidth, maxHeight: .infinity)
        .mmBackground()
        .onAppear {
            isShown = true
            isRotate.toggle()
        }
        .onReceive(FlowManager.shared.$pendingTx) { value in
            self.isPending = value != nil
            isShown = value == nil
            isRotate.toggle()
        }
    }
}

struct MakerView_Previews: PreviewProvider {
    static var previews: some View {
        MakerPage(vm: .init(MakerViewModel()))
    }
}
