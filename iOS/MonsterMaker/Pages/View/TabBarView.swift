//
//  TabBarView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI

struct TabItemData {
    let image: String
    let selectedImage: String
}

struct TabBarView: View {
    let items: [TabItemData]
    @Binding var selectedIndex: Int
    
    var body: some View {
        VStack(alignment: .trailing) {
            Spacer()
            HStack(spacing: 0) {
                
                ForEach(items.indices, id: \.self) { index in
                    let item = items[index]
                    let isSelected = selectedIndex == index
                    
                    Button {
                        self.selectedIndex = index
                    } label: {
                        Image(isSelected ? item.selectedImage : item.image)
                            .font(.largeTitle.weight(.black))
                            .frame(maxWidth: .infinity, maxHeight: .infinity)
                    }
//                    .foregroundColor(isSelected ? Color.MM.dark : Color.MM.grey)
//                    .animation(.easeInOut, value: isSelected)
                }
                
            }
            .background{
                Image("bottom-bar")
                    .resizable()
                    .scaledToFill()
                    .frame(width: .screenWidth)
            }
            .frame(height: 70)
        }
        .navigationBarTitle("")
        .navigationBarHidden(true)
    }
}

struct TabBarView_Previews: PreviewProvider {
    static var previews: some View {
        TabBarView(items: [
            .init(image: "create-button-on",
                  selectedImage: "create-button-off"),
            .init(image: "view-button-on" ,
                  selectedImage: "view-button-off")
        ],
                   selectedIndex: .constant(0))
    }
}
