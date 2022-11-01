//
//  TabBarView.swift
//  MonsterMaker
//
//  Created by Hao Fu on 1/11/2022.
//

import SwiftUI

struct TabItemData {
    let systemImage: String
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
                        Image(systemName: item.systemImage)
                            .font(.largeTitle.weight(.black))
                            .frame(maxWidth: .infinity, maxHeight: .infinity)
                    }
                    .background(isSelected ? Color.MM.grey : Color.MM.dark )
                    .foregroundColor(isSelected ? Color.MM.dark : Color.MM.grey)
                    .animation(.easeInOut, value: isSelected)
                }
                
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
            .init(systemImage: "square.and.pencil"),
            .init(systemImage: "square.grid.2x2.fill")
        ],
                   selectedIndex: .constant(0))
    }
}
