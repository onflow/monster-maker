import { ArrowButton } from 'components/';
import React from 'react';
import styles from './HorizontalPicker.module.css';

interface Props {
  partName: string;
  increment: VoidFunction;
  decrement: VoidFunction;
  topOffset: number;
}

const HorizontalPicker = ({
  partName,
  increment,
  decrement,
  topOffset,
}: Props) => {
  return (
    <>
      <ArrowButton
        direction="left"
        onClick={decrement}
        alt={`Change ${partName}`}
        style={{ top: topOffset }}
        className={styles.decrementArrow}
      />

      <ArrowButton
        direction="right"
        onClick={increment}
        alt={`Change ${partName}`}
        style={{ top: topOffset }}
        className={styles.incrementArrow}
      />
    </>
  );
};

export default HorizontalPicker;
