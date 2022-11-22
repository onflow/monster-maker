import Image from 'next/image';
import styles from './NFTBodyPart.module.css';

interface Props {
  src: string;
  alt: string;
}

const NFTBodyPart = ({ src, alt }: Props) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={1024}
      height={1024}
      className={styles.scaleBody}
    />
  );
};

export default NFTBodyPart;
