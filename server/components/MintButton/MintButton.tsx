import React from 'react';
import styles from './MintButton.module.css';

interface Props {
  onClick: VoidFunction;
  isMintInProgress?: boolean;
}

export default function MintButton({ onClick, isMintInProgress }: Props) {
  return isMintInProgress ? (
    <img
      src="/images/ui/monster_maker_minting_banner.png"
      alt="Minting in progress..."
      className={styles.mintBanner}
    />
  ) : (
    <img
      src="/images/ui/monster_maker_bottom_bar_mint.png"
      alt="Initialize to start minting monsters"
      onClick={onClick}
      className={styles.mintButton}
    />
  );
}
