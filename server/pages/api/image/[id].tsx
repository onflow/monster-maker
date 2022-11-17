// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs/promises'
import { join } from 'path'
import { createCanvas, Image } from '@napi-rs/canvas'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    const id = req.query.id as string
    const components = id.split('-').map(id => parseInt(id) + 1)

    if (components.length < 4) {
        return res.status(403).json({message: 'Invalid parameter'})
    }

    const size = 800
    const bodySize = size * 0.8
    const offset = (size - bodySize)/2

    try {
        const backgroundPath = join(process.cwd(), 'public', 'images', 'background', `bg_${components[0]}.png`)
        const backgroundSource = await fs.readFile(backgroundPath);
        const headPath = join(process.cwd(), 'public', 'images', 'head', `monster_head_${components[1]}.png`)
        const headSource = await fs.readFile(headPath);
        const torsoPath = join(process.cwd(), 'public', 'images', 'torso', `monster_torso_${components[2]}.png`)
        const torsoSource = await fs.readFile(torsoPath);
        const legsPath = join(process.cwd(), 'public', 'images', 'legs', `monster_legs_${components[3]}.png`)
        const legsSource = await fs.readFile(legsPath);

        const canvas = createCanvas(size, size);
        const ctx = canvas.getContext("2d");

        const bgImg = new Image();
        bgImg.src = backgroundSource
        ctx.drawImage(bgImg, 0, 0, size, size);

        const headImg = new Image();
        headImg.src = headSource
        ctx.drawImage(headImg, offset, offset, bodySize, bodySize);

        const torsoImg = new Image();
        torsoImg.src = torsoSource
        ctx.drawImage(torsoImg, offset, offset, bodySize, bodySize);

        const legsImg = new Image();
        legsImg.src = legsSource
        ctx.drawImage(legsImg, offset, offset, bodySize, bodySize);

        const image = canvas.toBuffer('image/png');
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.status(200).end(image, 'binary');
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error: error
        })
    }
}
