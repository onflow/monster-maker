//
//  InitView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 16/11/2022.
//

import SwiftUI

extension InitPage {
    struct ViewState {
        var components: NFTLocalData = .init(background: NFTLocalImage.backgrounds.randomIndex,
                                             head: NFTLocalImage.headers.randomIndex,
                                             torso: NFTLocalImage.torso.randomIndex,
                                             legs: NFTLocalImage.legs.randomIndex)
    }

    enum Action {
        case initialize
    }
}

struct InitPage: View {
    @StateObject
    var vm: AnyViewModel<ViewState, Action>

    @State
    var isShown: Bool = false

    @State
    var isRotate: Bool = false

    let animationDuration = 1.5

    var body: some View {
        VStack(spacing: .MM.zero) {
            HeaderView()
            Spacer()
            NFTLocalView(data: vm.components, showAnimation: false)
                .aspectRatio(CGSize(width: 1, height: 1), contentMode: .fit)
                .opacity(0.5)
                .padding(.horizontal, .MM.large)

            Spacer(minLength: .MM.double)

            Button {
                vm.trigger(.initialize)
            } label: {
                Image("initialize-bubble")
                    .resizable()
                    .scaledToFit()
                    .offset(y: isShown ? 0 : 500)
                    .animation(.easeInOut(duration: animationDuration),
                               value: isShown)
                    .padding(.bottom, .MM.medium)
            }

            HStack(alignment: .center) {
                Button {
                    vm.trigger(.initialize)
                } label: {
                    Image("initialize-button")
                        .resizable()
                        .scaledToFit()
                        .frame(height: 52)
                }

            }.background {
                Image("bottom-bar")
                    .resizable()
                    .scaledToFill()
                    .frame(width: .screenWidth)
            }
            .frame(height: 70)
        }
        .frame(maxWidth: .screenWidth, maxHeight: .infinity)
        .mmBackground()
        .onAppear {
            isShown = true
            isRotate.toggle()
        }
    }
}

struct InitView_Previews: PreviewProvider {
    static var previews: some View {
        InitPage(vm: .init(InitViewModel()))
    }
}
