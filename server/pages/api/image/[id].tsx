// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import NFTView from '../../../components/NFTView'
const React = require('react');
const { renderToString } = require('react-dom/server');
import html2canvas from 'html2canvas';
import { toJpeg, toBlob} from 'html-to-image';
import satori from 'satori'
const sharp = require('sharp')
import fs from 'fs/promises'
import { join } from 'path'
const nodeHtmlToImage = require('node-html-to-image')

async function imageDataURI(path: string) {
    const image = await fs.readFile(path);
    const base64Image = image.toString('base64');
    return 'data:image/png;base64,' + base64Image
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    const id = req.query.id as string
    const components = id.split('-').map(id => parseInt(id))

    console.log('Components =>', components);

    if (components.length < 4) {
        return res.status(403).json({message: 'Invalid'})
    }

    try {
        const backgroundPath = join(process.cwd(), 'public', 'images', 'background', `bg_${components[0]}.png`)
        const backgroundSource = await imageDataURI(backgroundPath)
        res.status(200).json({backgroundPath, backgroundSource});
        return

        const headPath = join(process.cwd(), 'public', 'images', 'head', `monster_head_${components[1]}.png`)
        const headSource = await imageDataURI(headPath)
        const torsoPath = join(process.cwd(), 'public', 'images', 'torso', `monster_torso_${components[2]}.png`)
        const torsoSource = await imageDataURI(torsoPath)
        const legsPath = join(process.cwd(), 'public', 'images', 'legs', `monster_legs_${components[3]}.png`)
        const legsSource = await imageDataURI(legsPath)

        console.log('Image Path =>', backgroundPath, headPath, torsoPath, legsPath);
        console.log('Image Source =>', backgroundSource, legsSource, headSource, torsoSource);
    
        const image = await nodeHtmlToImage({
            html: 
            `
            <html>
                <head>
                    <style>
                    html {
                        padding: 0;
                        margin: 0;
                    }
    
                    body {
                        padding: 0;
                        margin: 0;
                        width: 1024px;
                        height: 1024px;
                    }
    
                    .overlapGrid {
                        display: grid;
                        grid-template-areas: overlay;
                      }
                      
                    .overlapGrid > img {
                        grid-area: overlay;
                        width: 1024px;
                        height: 1024px; 
                        layout: responsive;
                    }
    
                    .other {
                        transform: scale(0.8);
                    }
    
                    </style>
                </head>
                <body>
                    <div class="overlapGrid">
                        <img src="{{backgroundSource}}"/>
                        <img src="{{headSource}}" class="other" />
                        <img src="{{torsoSource}}" class="other"/>
                        <img src="{{legsSource}}" class="other" />
                    </div>
                </body>
            </html>
            `,
            content: { backgroundSource, legsSource, headSource, torsoSource},
            transparent: true
          });
        res.writeHead(200, { 'Content-Type': 'image/png' });
        res.status(200).end(image, 'binary');
    } catch(error) {
        console.log(error);
        res.status(500).json({
            error: error
        })
    }
}
