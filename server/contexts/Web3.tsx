import * as fcl from '@onflow/fcl';
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

interface IWeb3Context {
  connect: () => void;
  logout: () => void;
  user: {
    loggedIn: boolean | null;
  };
}

export const networks = {
  emulator: {
    accessApi: process.env.NEXT_PUBLIC_EMULATOR_API || 'http://localhost:8888',
    walletDiscovery: 'https://fcl-discovery.onflow.org/local/authn',
    walletDiscoveryApi: 'https://fcl-discovery.onflow.org/api/local/authn',
    walletDiscoveryInclude: [],
  },
  testnet: {
    accessApi: 'https://rest-testnet.onflow.org',
    walletDiscovery: 'https://fcl-discovery.onflow.org/testnet/authn',
    walletDiscoveryApi: 'https://fcl-discovery.onflow.org/api/testnet/authn',
    walletDiscoveryInclude: [
      '0x82ec283f88a62e65', // Dapper Wallet
    ],
  },
  mainnet: {
    accessApi: 'https://rest-mainnet.onflow.org',
    walletDiscovery: 'https://fcl-discovery.onflow.org/authn',
    walletDiscoveryApi: 'https://fcl-discovery.onflow.org/api/authn',
    walletDiscoveryInclude: [
      '0xead892083b3e2c6c', // Dapper Wallet
    ],
  },
} as const;

type NetworksKey = keyof typeof networks;

export const Web3Context = createContext<IWeb3Context>({} as IWeb3Context);

export const useWeb3Context = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3Context must be used within a Web3ContextProvider');
  }
  return context;
};

export const Web3ContextProvider = ({
  children,
  network = 'testnet',
}: {
  children: ReactNode;
  network?: string;
}) => {
  const [user, setUser] = useState({ loggedIn: null });

  useEffect(() => {
    const {
      accessApi,
      walletDiscovery,
      walletDiscoveryApi,
      walletDiscoveryInclude,
    } = networks[network as NetworksKey];
    const iconUrl =
      window.location.origin + '/images/ui/monster_maker_logo.png';
    const appTitle = process.env.NEXT_PUBLIC_APP_NAME || 'MonsterMaker';

    fcl.config({
      'app.detail.title': appTitle,
      'app.detail.icon': iconUrl,
      'accessNode.api': accessApi, // connect to Flow
      'discovery.wallet': walletDiscovery, // use wallets on public discovery
      'discovery.authn.endpoint': walletDiscoveryApi, // public discovery api endpoint
      'discovery.authn.include': walletDiscoveryInclude, // opt-in wallets
    });
  }, [network]);

  useEffect(() => fcl.currentUser.subscribe(setUser), []);

  const connect = useCallback(() => {
    fcl.authenticate();
  }, []);

  const logout = useCallback(async () => {
    await fcl.unauthenticate();
  }, []);

  const providerProps = useMemo(
    () => ({
      connect,
      logout,
      user,
    }),
    [connect, logout, user],
  );

  // for Nextjs, return null until "window" is available
  if (!global.window) {
    return null;
  }

  return (
    <Web3Context.Provider
      value={{
        ...providerProps,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
