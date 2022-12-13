import { Center, Heading, Tag, Image } from "@chakra-ui/react"
import * as React from "react"

import { NavbarBase } from "./NavbarBase"

export const Navbar = () => {
  const menuItems = React.useMemo(() => {
    return [
      {
        title: "Drops",
        href: "/app/drops",
      },
      {
        title: "My Monsters",
        href: "/app/collection",
      },
      {
        title: "My Account",
        href: "/app/account",
      },
    ]
  }, [])

  return (
    <NavbarBase
      leftComponent={
        <>
          <Heading color="white" pt={10}>
            <Image htmlWidth={200} src="/images/ui/monster_maker_logo.png" alt="MonsterMaker" />
          </Heading>
        </>
      }
      menu={menuItems}
    />
  )
}
