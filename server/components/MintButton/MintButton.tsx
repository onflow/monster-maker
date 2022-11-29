import React from 'react';
import styles from './MintButton.module.css';

interface Props {
  onClick: VoidFunction;
}

export default function MintButton({ onClick }: Props) {
  return (
    <img
      src="/images/ui/monster_maker_bottom_bar_mint.png"
      alt="Initialize to start minting monsters"
      onClick={onClick}
      className={styles.mintButton}
    />
  );
}
