import { useRouter } from 'next/router';
import Image from 'next/image';

const Index = () => {
  const router = useRouter();

  const routeToMonsterMaker = () => {
    router.push('https://monster-maker-app.vercel.app')
  }

  return (
    <a href="#" onClick={routeToMonsterMaker}>
        <Image
          src="/images/monster_maker_logo.png"
          alt="logo"
          width={2176}
          height={800}
          layout="responsive"
        />
    </a>
  );
};

export default Index;
