import { Box } from "@chakra-ui/react"
import React from "react"
import { useQuery } from "urql"

import { NftModelsDocument, NftModelsQuery } from "../../../../generated/graphql"
import AppLayout from "../../../components/AppLayout"
import { NFTModelsGrid } from "../../../components/drops/NFTModelsGrid"
import { SectionHeader } from "../../../ui/SectionHeader"
import tileBackground from "../../../images/ui/button_background_tileable.png"

export const NFTModelsPage = () => {
  const [result] = useQuery<NftModelsQuery>({
    query: NftModelsDocument,
    variables: { appId: process.env.NEXT_PUBLIC_CLIENT_ID },
  })

  const nftModels = result?.data?.nftModels?.items

  console.log(NftModelsDocument)
  console.log(nftModels)

  return (
    <AppLayout>
      <Box maxW="100vw" mx="auto">
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
        <SectionHeader text="Get A Monster" />
        {nftModels && <NFTModelsGrid nftModels={nftModels} />}
      </Box>
    </AppLayout>
  )
}

export default NFTModelsPage
