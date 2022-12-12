import Image from 'next/image';

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

export default Index;
