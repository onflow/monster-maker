import { Button, Image } from "@chakra-ui/react"
import { useWalletContext } from "../hooks/useWalletContext"
import exit from "../images/ui/monster_maker_exit_icon.png"

export function LogOut() {
  const { signOut } = useWalletContext()
  return (
    <Image
      htmlWidth={40}
      src={exit.src}
      alt="exit"
      onClick={signOut}
      pt={5}
      style={{ cursor: "pointer" }}
    />
  )
}
