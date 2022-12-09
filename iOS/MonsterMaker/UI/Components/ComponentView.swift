//
//  ComponentView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI

struct ComponentView: View {
    var images: [String]

    @Binding
    var currentIndex: Int

    @Binding
    var hideButton: Bool

    var position: NFTComponent = .head

    @State
    var appear = false

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
        screenWidth - CGFloat.MM.large * 2 - CGFloat.MM.medium * 2
    }

    private func previousImage() {
        UIImpactFeedbackGenerator(style: .soft).impactOccurred()
        if currentIndex == 0 {
            currentIndex = images.count - 1
            return
        }
        currentIndex = currentIndex - 1
    }

    private func nextImage() {
        UIImpactFeedbackGenerator(style: .soft).impactOccurred()
        if currentIndex == images.count - 1 {
            currentIndex = 0
            return
        }
        currentIndex = currentIndex + 1
    }

    var body: some View {
        VStack(alignment: .center, spacing: 0) {
            Button {
                previousImage()
            } label: {
                Image("arrow-up")
            }
            .visibility(!isBackground ? .gone : .visible)
            .offset(y: -.MM.zero)
            .visibility(hideButton ? .gone : .visible)

            HStack {
                Button {
                    previousImage()
                } label: {
                    Image("arrow-left")
                }
                .visibility(isBackground ? .gone : .visible)
                .offset(y: offset)
                .visibility(hideButton ? .gone : .visible)

                if position == .head {
                    if let image = images[safe: currentIndex] {
                        Image(image)
                            .resizable()
                            .scaledToFit()
                            .frame(maxWidth: imageHeight, maxHeight: imageHeight)
                            .aspectRatio(1, contentMode: .fill)
                            .allowsHitTesting(false)
                            .zIndex(1100)
                            .offset(x: 0, y: appear ? 2 : 0)
                            .animation(Animation.linear(duration: 0.5)
                                .repeatForever(autoreverses: true),
                                value: appear)
                            .scaleEffect(isBackground ? CGSize(width: 1, height: 1) : CGSize(width: 0.8, height: 0.8))
                    }
                } else {
                    if let image = images[safe: currentIndex] {
                        Image(image)
                            .resizable()
                            .scaledToFit()
                            .frame(maxWidth: imageHeight, maxHeight: imageHeight)
                            .aspectRatio(1, contentMode: .fill)
                            .allowsHitTesting(false)
                            .zIndex(1100)
                            .scaleEffect(isBackground ? CGSize(width: 1, height: 1) : CGSize(width: 0.8, height: 0.8))
                    }
                }

                Button {
                    nextImage()
                } label: {
                    Image("arrow-right")
                }
                .visibility(isBackground ? .gone : .visible)
                .offset(y: offset)
                .visibility(hideButton ? .gone : .visible)
            }

            Button {
                nextImage()
            } label: {
                Image("arrow-down")
            }
            .visibility(!isBackground ? .gone : .visible)
            .offset(y: .MM.small)
            .visibility(hideButton ? .gone : .visible)
        }
        .animation(.easeInOut, value: hideButton)
        .padding(.horizontal, .MM.standard)
        .frame(width: screenWidth)
        .onAppear {
            appear = true
        }
    }
}

struct ComponentView_Previews: PreviewProvider {
    static let screenWidth = UIScreen.main.bounds.width

    static var previews: some View {
        ZStack {
            ComponentView(images: NFTLocalImage.backgrounds,
                          currentIndex: .constant(1),
                          hideButton: .constant(false),
                          position: .background)
            ComponentView(images: NFTLocalImage.headers,
                          currentIndex: .constant(1),
                          hideButton: .constant(false),
                          position: .head)
            ComponentView(images: NFTLocalImage.legs,
                          currentIndex: .constant(1),
                          hideButton: .constant(false),
                          position: .legs)
            ComponentView(images: NFTLocalImage.torso,
                          currentIndex: .constant(1),
                          hideButton: .constant(false),
                          position: .torso)
        }
//        .previewLayout(.sizeThatFits)
    }
}
