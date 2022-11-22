import Image from 'next/image';
import styles from './Button.module.css';

interface Props {
  src: string;
  width: number;
  height: number;
  onClick?: VoidFunction;
}

const Button = ({ src, width, height, onClick }: Props) => {
  return (
    <Image
      src={src}
      alt="background"
      width={width}
      height={height}
      onClick={onClick}
      className={styles.button}
    />
  );
};

export default Button;
