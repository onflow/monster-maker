import { ReactNode } from 'react';
import styles from './NavPanel.module.css';
import tileBackground from 'public/images/ui/button_background_tileable.png';

interface Props {
  children: ReactNode;
}

const NavPanel = ({ children }: Props) => {
  return (
    <nav
      style={{ backgroundImage: `url(${tileBackground.src})` }}
      className={styles.navPanel}
    >
      {children}
    </nav>
  );
};

export default NavPanel;
