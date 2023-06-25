![banner](./assets/banner.png)

## Monster Maker

Monster Maker is a mobile and web dApp ( distributed application ) on [Flow Blockchain](https://onflow.org) that allows users to connect a wallet, sign a transaction to mint an NFT (a monster) and display their collection of NFTs (their monsters) within the app. It’s meant to be a lightweight sample project to exemplify how to build a mobile or web dApp Flow project.

## Project Structure

Before we get started, here is a general overview of the Monster Maker monorepo structure.

- `cadence` folder is where the smart contract, transactions and queries located, you can use [Flow CLI](https://developers.flow.com/tools/emulator/index) to develop and deploy the NFT contract.
  - Best practice guidance for Flow dapp development is located at: https://developers.flow.com/cadence/style-guide/project-development-tips
- `iOS` folder contains all the Swift code to exemplify how to build mobile dApp on Flow Blockchain
- `server` folder will guide you on how to build a web dApp and API on Flow

## Getting Started

If using the Flow Emulator or interacting with the smart contract locally first rename or copy `flow.json.example` to `flow.json`

```bash
mv flow.json.example flow.json
```
