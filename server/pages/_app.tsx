import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Web3ContextProvider } from 'contexts/Web3';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Web3ContextProvider network={process.env.NEXT_PUBLIC_FLOW_ENV}>
      <Component {...pageProps} />
    </Web3ContextProvider>
  );
};

export default App;
