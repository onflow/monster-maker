import { GetServerSideProps } from 'next';
import Image from 'next/image';

const WEB_CLIENT_PATH = 'https://monster-maker-web-client.vercel.app';

const Index = () => {
  return (
    <a href="https://monster-maker-web-client.vercel.app">
      <Image
        src="/images/monster_maker_logo.png"
        alt="Go to Monster Maker"
        width={2176}
        height={800}
        layout="responsive"
      />
    </a>
  );
};

// Redirect to web client
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  ctx.res.setHeader('Location', WEB_CLIENT_PATH);
  ctx.res.statusCode = 301;
  ctx.res.end();
  return {
    props: {},
  };
};

export default Index;

