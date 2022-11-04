import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {head, legs, torso, background, headRange, backgroundRange, legsRange, torsoRange} from '../util'

const NFTView = ({bgIndex, headIndex, legsIndex, torsoIndex} : {bgIndex: number, headIndex: number, legsIndex: number, torsoIndex: number}) => {

    const image = (src: string) => {
        return (<Image src={src} alt="torso" width={1024} height={1024} layout="responsive"/>)
      }
    
    return (
        <div className={styles.overlapGrid}>
        {image(background(bgIndex))}
        {image(head(headIndex))}
        {image(torso(torsoIndex))}
        {image(legs(legsIndex))}
        </div>
    )

}

export default NFTView