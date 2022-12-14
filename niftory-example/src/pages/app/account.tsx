import { VStack, Box } from "@chakra-ui/react"
import React from "react"

import AppLayout from "../../components/AppLayout"
import { WalletSetup } from "../../components/wallet/WalletSetup"
import { SectionHeader } from "../../ui/SectionHeader"
import tileBackground from "../../images/ui/button_background_tileable.png"

const AccountPage = () => {
  return (
    <AppLayout>
      <VStack>
        <SectionHeader text="My Account" />
        <WalletSetup />
      </VStack>
      <Box
        position="absolute"
        bottom="0"
        bgImage={tileBackground.src}
        bgPosition="bottom"
        bgRepeat="repeat-x"
        bgSize="contain"
        width="100vw"
        minH={{ base: "240px" }}
      ></Box>
    </AppLayout>
  )
}
AccountPage.requireWallet = true

export default AccountPage
