import { CSSProperties } from 'react';
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
  style?: CSSProperties;
  className?: string;
}

const ArrowButton = ({ direction, onClick, alt, style, className }: Props) => {
  const wrapperStyles =
    direction === 'up' || direction === 'down'
      ? styles.wrapperVertical
      : styles.wrapperHorizontal;

  return (
    <div
      style={style}
      className={className ? `${className} ${wrapperStyles}` : wrapperStyles}
    >
      <img
        src={directions[direction]}
        onClick={onClick}
        alt={alt}
        className={styles.arrowButton}
      />
    </div>
  );
};

export default ArrowButton;
