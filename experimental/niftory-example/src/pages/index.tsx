import { Button } from "@chakra-ui/react"
import { useRouter } from "next/router"
import React from "react"

import AppLayout from "../components/AppLayout"
import { Hero } from "../ui/Hero"

import tileBackground from "../images/ui/button_background_tileable.png"

const HomePage = () => {
  const router = useRouter()

  return (
    <AppLayout>
      <Hero
        button={
          <Button
            p="8"
            borderRadius="0"
            onClick={() => router.push("/app/drops")}
            style={{
              background: "#A41B15",
              borderRadius: 0,
              boxShadow: "5px 5px #ffffff",
              textTransform: "uppercase",
            }}
          >
            Get Monsters
          </Button>
        }
        imageUrl={tileBackground.src}
      />
    </AppLayout>
  )
}

export default HomePage
