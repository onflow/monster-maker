import Image from 'next/legacy/image';

interface Props {
  src: string;
}

const BackgroundImage = ({ src }: Props) => {
  return (
    <Image
      src={src}
      alt="background"
      width={1024}
      height={1024}
      layout="responsive"
    />
  );
};

export default BackgroundImage;
