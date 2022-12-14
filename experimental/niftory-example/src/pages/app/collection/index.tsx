import { Box } from "@chakra-ui/react"
import { useQuery } from "urql"

import AppLayout from "../../../components/AppLayout"
import { Nft, NftsByWalletDocument, NftsByWalletQuery } from "../../../../generated/graphql"
import { CollectionGrid } from "../../../components/collection/CollectionGrid"
import { Subset } from "../../../lib/types"
import { SectionHeader } from "../../../ui/SectionHeader"
import { useWalletContext } from "../../../hooks/useWalletContext"
import tileBackground from "../../../images/ui/button_background_tileable.png"

const CollectionPage = () => {
  const { currentUser } = useWalletContext()

  const [nftsByWalletResponse] = useQuery<NftsByWalletQuery>({
    query: NftsByWalletDocument,
    variables: { address: currentUser?.addr },
    pause: !currentUser?.addr,

    // refetch in the background in case the user has purchased something
    requestPolicy: "cache-and-network",
  })

  const nfts: Subset<Nft>[] = nftsByWalletResponse?.data?.nftsByWallet?.items

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
        <SectionHeader text="My Monsters" />
        <CollectionGrid nfts={nfts} isLoading={nftsByWalletResponse.fetching} />
      </Box>
    </AppLayout>
  )
}

CollectionPage.requireWallet = true
export default CollectionPage
