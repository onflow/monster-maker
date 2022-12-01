import { useState } from 'react';
import getRandomInt from 'utils/getRandomInt';

export interface PartSelectorReturnProps {
  index: number;
  increment: VoidFunction;
  decrement: VoidFunction;
}

const usePartSelector = (numberOfParts: number): PartSelectorReturnProps => {
  const [index, setIndex] = useState<number>(() => getRandomInt(numberOfParts));

  const increment = () =>
    setIndex((idx) => {
      let newIndex = idx + 1;

      if (newIndex >= numberOfParts) {
        newIndex = 0;
      }

      return newIndex;
    });

  const decrement = () =>
    setIndex((idx) => {
      let newIndex = idx - 1;

      if (newIndex < 0) {
        newIndex = numberOfParts - 1;
      }

      return newIndex;
    });

  return { index, increment, decrement };
};

export default usePartSelector;
