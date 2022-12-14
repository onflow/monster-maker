import { chakra, HTMLChakraProps } from "@chakra-ui/react"
import Link from "next/link"
import * as React from "react"

const DesktopNavLinkNormal = ({ href = "", ...props }: HTMLChakraProps<"a">) => {
  return (
    <Link href={href} passHref>
      <chakra.a
        fontWeight="700"
        fontSize="25px"
        textShadow="2px 2px #555555"
        display="flex"
        alignItems="center"
        justifyContent="center"
        transition="all 0.2s"
        color="navbar.text"
        _hover={{
          borderColor: "currentcolor",
          color: "#4BA823",
          fontWeight: "725",
        }}
        {...props}
      />
    </Link>
  )
}

const MobileNavLinkNormal = ({ href = "", ...props }: HTMLChakraProps<"a">) => {
  return (
    <Link href={href} passHref>
      <chakra.a
        display="block"
        textAlign="center"
        fontWeight="460"
        py="5"
        fontSize="lg"
        color="navbar.text"
        w="full"
        _hover={{
          bg: "blackAlpha.200",
        }}
        {...props}
      />
    </Link>
  )
}

export const NavLinkNormal = {
  Mobile: MobileNavLinkNormal,
  Desktop: DesktopNavLinkNormal,
}
