import { Box, Flex } from "@chakra-ui/layout"

import { Footer } from "../ui/Footer"
import { Navbar } from "../ui/Navbar/Nav"

type Props = {
  children: React.ReactNode
}

export default function AppLayout({ children }: Props) {
  return (
    <Flex
      direction="column"
      minH="100vh"
      minW="320"
      bgGradient="linear(to-b, #061b20, #1c6470, #d3e549)"
    >
      <Navbar />
      <Box flexGrow={1}>
        <Box w="100%" py="12">
          {children}
        </Box>
      </Box>
    </Flex>
  )
}
