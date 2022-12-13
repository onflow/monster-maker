import { Center, Heading, HeadingProps } from "@chakra-ui/react"
import React from "react"

export interface SectionHeaderProps extends HeadingProps {
  text: string
}

export const SectionHeader = (props: SectionHeaderProps) => {
  const { text } = props

  return (
    <Center>
      <Heading
        color="#4BA823"
        as="h1"
        size="2xl"
        lineHeight="1"
        fontWeight="extrabold"
        letterSpacing="tight"
        py="12"
        textShadow="2px 2px yellow"
      >
        {text}
      </Heading>
    </Center>
  )
}
