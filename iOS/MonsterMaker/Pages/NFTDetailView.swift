//
//  NFTDetailView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 3/11/2022.
//

import SwiftUI

struct NFTDetailView: View {
    
    @Environment(\.presentationMode)
    var presentationMode
    
    let data: NFTLocalData
    
    let title = "Monster Maker NFT"
    
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
            
            NFTLocalView(data: data)
                .padding(.horizontal, .MM.double)
            
//            Text("NFT \(data.head)\(data.torso)\(data.legs)")
//                .font(.largeTitle)
//                .fontWeight(.semibold)
            
            Spacer()
            
            ZStack(alignment: .bottom) {
                Image("bottom-bar")
                    .resizable()
                    .scaledToFit()
                
                Button {
                    
                    Task {
                        UIImpactFeedbackGenerator(style: .soft).impactOccurred()
                        let image = NFTLocalView(data: data).snapshot()
                        let itemSource = ShareActivityItemSource(shareText: title, shareImage: image)
                        let activityController = UIActivityViewController(activityItems: [image, title, itemSource], applicationActivities: nil)
                        activityController.isModalInPresentation = true
                        
                        if let keyWindow = UIApplication.shared.currentUIWindow(),
                           let rootVC = keyWindow.rootViewController {
                            rootVC.present(activityController, animated: true, completion: nil)
                        }
                    }
                    
                } label: {
                    Image("share-button")
                        .resizable()
                        .scaledToFit()
                        .frame(height: 50)
                        .padding(.bottom, 48)
                }
            }
            
        }
        .ignoresSafeArea(edges: .bottom)
        .mmBackground()
        .navigationTitle("")
        .navigationBarHidden(true)
//        .toolbar(.hidden, for: .tabBar)
    }
}

struct NFTDetailView_Previews: PreviewProvider {
    static var previews: some View {
        NFTDetailView(data: .init(background: 0,
                                  head: 0,
                                  torso: 0,
                                  legs: 0))
    }
}
