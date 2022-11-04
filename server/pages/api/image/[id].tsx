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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
    const id = req.query.id as string
    const components = id.split('-').map(id => parseInt(id))

    if (components.length < 4) {
        return res.status(403).json({message: 'Invalid'})
    }

    console.log('components ->', components)

    const component = (components: number[])=> {
        return (
            <NFTView bgIndex={components[0]} headIndex={components[1]} legsIndex={components[2]} torsoIndex={components[3]} />
        );
    }

    // var myDiv = document.createElement('div');
    const svgString = renderToString(
        React.createElement(component)
    );


    const fontPath = join(process.cwd(), 'public', 'fonts', 'Roboto-Regular.ttf')
    console.log('fontPath ->',fontPath)
    const fontData = await fs.readFile(fontPath)
    const svg = await satori(svgString, 
    {
        width: 400,
        height: 400,
        fonts: [
            {
                name: 'Inter',
                data: fontData,
                weight: 400,
                style: 'normal',
              }
        ],
    })

    console.log(svg)

    const buffer = await sharp(Buffer.from(svg)).png().toBuffer()
    // const canvas = await html2canvas(svg);
    // const buffer = canvas.toDataURL('image/jpg');

    // const buffer = await toJpeg(React.createElement(component))

    res.setHeader('Content-Type', 'image/jpg');
    res.send(buffer);

    // res.status(200).json({ name: 'John Doe' })
}
