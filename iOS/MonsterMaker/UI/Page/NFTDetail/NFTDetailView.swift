//
//  NFTDetailView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 3/11/2022.
//

import SwiftUI

struct NFTDetailPage: View {
    @Environment(\.presentationMode)
    var presentationMode

    let data: NFTModel

    var body: some View {
        VStack {
            HStack {
                Button {
                    presentationMode.wrappedValue.dismiss()
                } label: {
                    Image("close-icon")
                        .resizable()
                        .scaledToFit()
                        .frame(width: 64)
                }

                Spacer()
            }.padding(.horizontal, .MM.standard)

            Spacer()

            NFTLocalView(data: data.component)
                .padding(.horizontal, .MM.double)

            Spacer()

            ZStack(alignment: .bottom) {
                Image("bottom-bar")
                    .resizable()
                    .scaledToFit()

                Button {
                    Task {
                        let title = "Monster Maker NFT #\(data.itemID)"
                        UIImpactFeedbackGenerator(style: .soft).impactOccurred()
                        let image = NFTLocalView(data: data.component)
                            .frame(width: 400, height: 400)
                            .snapshot()
                        let itemSource = ShareActivityItemSource(shareText: title, shareImage: image)
                        let activityController = UIActivityViewController(activityItems: [image, title, itemSource], applicationActivities: nil)
                        activityController.isModalInPresentation = true

                        if let keyWindow = UIApplication.shared.currentUIWindow(),
                           let rootVC = keyWindow.rootViewController
                        {
                            rootVC.present(activityController, animated: true, completion: nil)
                        }
                    }

                } label: {
                    Image("share-button")
                        .resizable()
                        .scaledToFit()
                        .frame(height: 50)
                        .padding(.bottom, .MM.large)
                }
            }
        }
        .ignoresSafeArea(edges: .bottom)
        .mmBackground()
        .navigationTitle("")
        .navigationBarHidden(true)
    }
}

struct NFTDetailPage_Previews: PreviewProvider {
    static var previews: some View {
        NFTDetailPage(data: .init(name: "",
                                  description: "",
                                  thumbnail: "",
                                  itemID: 0,
                                  resourceID: 0,
                                  owner: "",
                                  component: .init(background: 0,
                                                   head: 0,
                                                   torso: 0,
                                                   legs: 0))
        )
    }
}
