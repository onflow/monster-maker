import { Button, Heading, Stack, Text, Image } from "@chakra-ui/react"
import * as React from "react"
import * as fcl from "@onflow/fcl"
import { useCallback, useState } from "react"
import { useWalletContext } from "../../hooks/useWalletContext"

import { Gallery } from "../../ui/Content/Gallery/Gallery"
import axios from "axios"
import { useRouter } from "next/router"

type NFTModelDetailProps = {
  id: string
  metadata: {
    title: string
    description: string
    amount: number
    amountMinted: number
    content: {
      contentType: string
      contentUrl: string
      thumbnailUrl: string
      alt: string
    }[]
  }
}

const checkoutStatusMessages = [
  "",
  "Starting checkout...",
  "Waiting for transaction approval...",
  "Waiting for transaction completion...",
  "Completing checkout...",
  "Purchase complete! Redirecting...",
]

export const NFTModelDetail = ({ id, metadata }: NFTModelDetailProps) => {
  const router = useRouter()
  const [checkoutStatusIndex, setCheckoutStatusIndex] = useState(0)

  const { currentUser } = useWalletContext()

  const signTransaction = useCallback(async (transaction: string) => {
    const response = await axios.post("/api/signTransaction", { transaction })
    return response.data.signTransactionForDapperWallet
  }, [])
  console.log(checkoutStatusIndex)

  const handleCheckout = useCallback(async () => {
    try {
      setCheckoutStatusIndex(1)
      const initiateCheckoutResponse = await axios.post(`/api/nftModel/${id}/initiateCheckout`)
      const {
        cadence,
        registryAddress,
        brand,
        nftId,
        nftDatabaseId,
        nftTypeRef,
        setId,
        templateId,
        price,
        expiry,
        signerKeyId,
        signerAddress,
      } = initiateCheckoutResponse.data

      setCheckoutStatusIndex(2)
      const tx = await fcl.mutate({
        cadence,
        args: (arg, t) => [
          arg(process.env.NEXT_PUBLIC_MERCHANT_ACCOUNT_ADDRESS, t.Address),
          arg(registryAddress, t.Address),
          arg(brand, t.String),
          arg(nftId, t.Optional(t.UInt64)),
          arg(nftTypeRef, t.String),
          arg(setId, t.Optional(t.Int)),
          arg(templateId, t.Optional(t.Int)),
          arg(price, t.UFix64),
          arg(expiry, t.UInt64),
        ],
        authorizations: [
          async (account) => ({
            ...account,
            addr: signerAddress,
            tempId: `${signerAddress}-${signerKeyId}`,
            keyId: signerKeyId,
            signingFunction: async (signable) => {
              return {
                keyId: signerKeyId,
                addr: signerAddress,
                signature: await signTransaction(signable.message),
              }
            },
          }),
          fcl.authz,
        ],
        limit: 9999,
      })

      setCheckoutStatusIndex(3)
      await fcl.tx(tx).onceSealed()

      setCheckoutStatusIndex(4)
      const completeCheckoutResponse = await axios.post(`/api/nftModel/${id}/completeCheckout`, {
        transactionId: tx,
        nftDatabaseId,
      })

      setCheckoutStatusIndex(5)
      const nft = completeCheckoutResponse.data

      await router.push(`/app/collection/${nft.id}`)
    } finally {
      setCheckoutStatusIndex(0)
    }
  }, [currentUser?.addr, id, router, signTransaction])

  return (
    <Stack
      direction={{ base: "column-reverse", lg: "row" }}
      bg="teal.900"
      boxShadow="10px 10px"
      position="relative"
    >
      <Stack
        p="8"
        minW={{ lg: "sm" }}
        maxW={{ lg: "sm" }}
        // justify="center"
        backgroundColor="gray.800"
      >
        <Stack>
          <Stack>
            <Heading size="lg" fontWeight="bold" color="page.accent">
              {metadata.title}
            </Heading>
          </Stack>

          <Text color="page.text">{metadata.description}</Text>
          <Text color="page.text">{metadata.amount} Total </Text>
          <Text color="page.text">{metadata.amountMinted} Minted </Text>
        </Stack>
        <Button
          isLoading={!currentUser?.addr || checkoutStatusIndex > 0}
          isDisabled={metadata.amount === metadata.amountMinted}
          loadingText={checkoutStatusMessages[checkoutStatusIndex]}
          onClick={handleCheckout}
          my="auto"
          p="8"
          style={{
            background: "#A41B15",
            borderRadius: 0,
            boxShadow: "5px 5px #ffffff",
            textTransform: "uppercase",
          }}
        >
          {metadata.amount === metadata.amountMinted ? "Fully Minted" : "Mint!"}
        </Button>
      </Stack>
      <Gallery rootProps={{ overflow: "hidden", flex: "1" }} content={metadata.content} />
    </Stack>
  )
}
