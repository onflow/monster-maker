import Image from "next/image";
import styles from "../styles/Home.module.css";

interface Props {
  src: string;
  alt: string;
}

const BodyPartImage = ({ src, alt }: Props) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={1024}
      height={1024}
      layout="responsive"
      className={styles.scaleBody}
    />
  );
};

export default BodyPartImage;
