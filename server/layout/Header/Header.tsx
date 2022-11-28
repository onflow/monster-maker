import Button from 'components/Button';
import { useWeb3Context } from 'contexts/Web3';
import Image from 'next/image';
import React from 'react';
import styles from './Header.module.css';

export default function Header() {
  const { logout } = useWeb3Context();
  return (
    <div className={styles.header}>
      <div className={styles.logoWrapper}>
        <Image
          src="/images/ui/monster_maker_logo.png"
          alt="logo"
          width={2176}
          height={800}
          layout="responsive"
        />
      </div>

      <div className={styles.exitIconWrapper}>
      <Button
        src="/images/ui/monster_maker_exit_icon.png"
        alt="logo"
        width={2176}
        height={800}
        onClick={logout}
      />
      </div>
    </div>
  );
}
