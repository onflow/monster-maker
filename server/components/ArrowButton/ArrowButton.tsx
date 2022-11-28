import Image from 'next/legacy/image';
import styles from './ArrowButton.module.css';

const directions = {
  up: '/images/ui/up_arrow.png',
  down: '/images/ui/down_arrow.png',
  left: '/images/ui/left_arrow.png',
  right: '/images/ui/right_arrow.png',
} as const;

type Direction = keyof typeof directions;

interface Props {
  direction: Direction;
  onClick: VoidFunction;
  alt: string;
  className?: string;
}

const ArrowButton = ({ direction, onClick, alt, className }: Props) => {
  return (
    <div
      className={className ? `${className} ${styles.wrapper}` : styles.wrapper}
    >
      <Image
        src={directions[direction]}
        width={256}
        height={256}
        layout="responsive"
        onClick={onClick}
        alt={alt}
        className={styles.arrowButton}
      />
    </div>
  );
};

export default ArrowButton;
