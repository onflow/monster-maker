import type { AppProps } from 'next/app';
import 'styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  // TODO: Initiate FCL here to maintain state between route changes
  return <Component {...pageProps} />;
};

export default App;
