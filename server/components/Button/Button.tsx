import Image from 'next/image';
import styles from './Button.module.css';

interface Props {
  src: string;
  width: number;
  height: number;
  onClick?: VoidFunction;
  inactive?: boolean;
  alt: string;
}

const Button = ({ src, width, height, onClick, inactive, alt }: Props) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      onClick={onClick}
      style={{ cursor: inactive ? 'auto' : 'pointer' }}
      className={styles.button}
    />
  );
};

export default Button;
