import { ALL_UI_ASSETS } from 'constants/assets';
import { Head, Html, Main, NextScript } from 'next/document';

const Document = () => {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;900&display=swap"
          rel="stylesheet"
        ></link>
        {ALL_UI_ASSETS.map((href, idx) => (
          <link key={idx} rel="preload" href={href} as="image" />
        ))}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
