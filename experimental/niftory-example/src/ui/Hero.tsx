import { Box, Button, Heading, Stack, Text, Image } from "@chakra-ui/react"
import React from "react"
import logo from "../images/ui/monster_maker_logo.png"

interface IHeroWithBackgroundProps {
  heading?: React.ReactNode
  content?: React.ReactNode
  button?: React.ReactNode
  imageUrl?: string
}

export const Hero = ({ heading, button, content, imageUrl }: IHeroWithBackgroundProps) => {
  const headingComponent = React.useMemo(() => {
    return typeof heading === "string" ? (
      <Heading
        as="h1"
        size="3xl"
        lineHeight="1"
        fontWeight="light"
        letterSpacing="tight"
        color="header.text"
      >
        {heading}
      </Heading>
    ) : (
      heading
    )
  }, [heading])

  const contentComponent = React.useMemo(() => {
    return typeof content === "string" ? (
      <Text mt={4} fontWeight="medium" color={"header.text"}>
        {content}
      </Text>
    ) : (
      content
    )
  }, [content])

  const buttonComponent = React.useMemo(() => {
    return typeof button === "string" ? (
      <Button minWidth="200" height="14" px="8" fontSize="md">
        {button}
      </Button>
    ) : (
      button
    )
  }, [button])

  return (
    <Box width="100vw" minH={{ base: "90vh", sm: "100vh" }} position="relative">
      <Box
        position="absolute"
        bottom="0"
        bgImage={imageUrl}
        bgPosition="bottom"
        bgRepeat="repeat-x"
        bgSize="contain"
        width="100vw"
        minH={{ base: "240px" }}
      ></Box>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        pt={20}
      >
        <Image src={logo.src} alt="MonsterMaker" maxHeight={300} />
        {headingComponent}
        {contentComponent}
        <Stack direction={{ base: "column", sm: "row" }} spacing="4" mt="20">
          {buttonComponent}
        </Stack>
      </Box>
    </Box>
  )
}
