/* eslint-disable import/no-anonymous-default-export */
import { ImageResponse } from '@vercel/og';
import NFTView from '../../../components/NFTView'
import styles from 'styles/Home.module.css'
import Image from 'next/image'
import { join } from 'path'
import { NextRequest } from 'next/server';

// import bgImage from 'images/background/bg_1.png'

export const config = {
  runtime: 'experimental-edge',
};

export default async function handler(req: NextRequest) {
    const { searchParams } = req.nextUrl;
    const id = searchParams.get('id') as string;
    const components = id.split('-').map(id => parseInt(id))
    console.log(components)

    // const bgPath = join(process.cwd(), 'public', 'images', 'background', `bg_1.png`)

  return new ImageResponse(
    (
        <div className={styles.overlapGrid} style={{display: 'none'}}>
            <img src={'https://monster-maker-two.vercel.app/images/background/bg_1.png'} alt="torso" width={1024} height={1024}/>
            <img src={'https://monster-maker-two.vercel.app/images/legs/monster_legs_1.png'} alt="torso" width={1024} height={1024}/>
            <img src={'https://monster-maker-two.vercel.app/images/head/monster_head_1.png'} alt="torso" width={1024} height={1024}/>
            <img src={'https://monster-maker-two.vercel.app/images/torso/monster_torso_1.png'} alt="torso" width={1024} height={1024}/>
            {/* <NFTView bgIndex={1} headIndex={1} legsIndex={1} torsoIndex={1}/> */}
        </div>
    ),
    {
      width: 600,
      height: 600,
    },
  );
}