import { useState } from 'react';
import getRandomIndex from 'utils/getRandomIndex';

interface ReturnProps {
  array: number;
}

const usePartSelector = (range: Array<number>) => {
  // NOTE: Ranges are 1-indexed
  const [index, setIndex] = useState<number>(() => getRandomIndex(range));

  const increment = () =>
    setIndex((idx) => {
      let newIndex = idx + 1;

      if (newIndex > range.length) {
        newIndex = 1;
      }

      return newIndex;
    });

  const decrement = () =>
    setIndex((idx) => {
      let newIndex = idx - 1;

      if (newIndex < 1) {
        newIndex = range.length;
      }

      return newIndex;
    });

  return [index, increment, decrement] as const;
};

export default usePartSelector;
