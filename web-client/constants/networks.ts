const FLOW_ENV = process.env.NEXT_PUBLIC_FLOW_ENV || 'testnet';

const NETWORKS = {
  emulator: {
    flowNetwork: 'local',
    accessApi: process.env.NEXT_PUBLIC_EMULATOR_API || 'http://localhost:8888',
    walletDiscovery: 'https://fcl-discovery.onflow.org/local/authn',
    walletDiscoveryApi: 'https://fcl-discovery.onflow.org/api/local/authn',
    walletDiscoveryInclude: [],
    addresses: {
      FlowToken: '0x0ae53cb6e3f42a79',
      NonFungibleToken: '0x0ae53cb6e3f42a79',
      MetadataViews: '0x0ae53cb6e3f42a79',
      MonsterMaker: '0x0ae53cb6e3f42a79',
      FungibleToken: '0xee82856bf20e2aa6',
    },
  },
  testnet: {
    flowNetwork: 'testnet',
    accessApi: 'https://rest-testnet.onflow.org',
    walletDiscovery: 'https://fcl-discovery.onflow.org/testnet/authn',
    walletDiscoveryApi: 'https://fcl-discovery.onflow.org/api/testnet/authn',
    walletDiscoveryInclude: [
      '0x82ec283f88a62e65', // Dapper Wallet
    ],
    addresses: {
      FlowToken: '0x7e60df042a9c0868',
      NonFungibleToken: '0x631e88ae7f1d7c20',
      MetadataViews: '0x631e88ae7f1d7c20',
      MonsterMaker: '0xccd5ad285b372daa',
      FungibleToken: '0x9a0766d93b6608b7',
    },
  },
  mainnet: {
    flowNetwork: 'mainnet',
    accessApi: 'https://rest-mainnet.onflow.org',
    walletDiscovery: 'https://fcl-discovery.onflow.org/authn',
    walletDiscoveryApi: 'https://fcl-discovery.onflow.org/api/authn',
    walletDiscoveryInclude: [
      '0xead892083b3e2c6c', // Dapper Wallet
    ],
    addresses: {
      FlowToken: '0x1654653399040a61',
      NonFungibleToken: '0x1d7e57aa55817448',
      MetadataViews: '0x1d7e57aa55817448',
      MonsterMaker: '',
      FungibleToken: '0xf233dcee88fe0abe',
    },
  },
} as const;

type NetworksKey = keyof typeof NETWORKS;

export const NETWORK = NETWORKS[FLOW_ENV as NetworksKey];

export const getNetwork = (flowEnv = 'testnet') =>
  NETWORKS[flowEnv as NetworksKey];
