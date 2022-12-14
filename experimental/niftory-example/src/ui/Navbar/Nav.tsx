import { Heading, Image } from "@chakra-ui/react"
import * as React from "react"
import { LogOut } from "../../components/LogOut"
import { useRouter } from "next/router"

import { NavbarBase } from "./NavbarBase"
import { useWalletContext } from "../../hooks/useWalletContext"

export const Navbar = () => {
  const router = useRouter()
  const { currentUser } = useWalletContext()

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
        router.pathname !== "/" ? (
          <>
            <Heading color="white" pt={10}>
              <Image htmlWidth={200} src="/images/ui/monster_maker_logo.png" alt="MonsterMaker" />
            </Heading>
          </>
        ) : undefined
      }
      menu={menuItems}
      rightComponent={currentUser?.loggedIn ? <LogOut /> : undefined}
    />
  )
}
