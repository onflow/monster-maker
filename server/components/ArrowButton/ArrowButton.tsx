import Image from 'next/legacy/image';

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
}

const ArrowButton = ({ direction, onClick, alt }: Props) => {
  return (
    <Image
      src={directions[direction]}
      width={256}
      height={256}
      layout="responsive"
      onClick={onClick}
      alt={alt}
    />
  );
};

export default ArrowButton;
