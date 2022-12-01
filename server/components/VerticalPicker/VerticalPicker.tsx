import ArrowButton from 'components/ArrowButton';
import React from 'react';
import styles from './VerticalPicker.module.css';

interface Props {
  partName: string;
  increment: VoidFunction;
  decrement: VoidFunction;
}

const VerticalPicker = ({ partName, increment, decrement }: Props) => {
  return (
    <>
      <ArrowButton
        direction="up"
        onClick={decrement}
        alt={`Change ${partName}`}
        className={styles.decrementArrow}
      />

      <ArrowButton
        direction="down"
        onClick={increment}
        alt={`Change ${partName}`}
        className={styles.incrementArrow}
      />
    </>
  );
};

export default VerticalPicker;
