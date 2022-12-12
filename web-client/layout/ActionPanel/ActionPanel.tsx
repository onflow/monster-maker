import { ReactNode } from 'react';
import styles from './ActionPanel.module.css';

interface Props {
  // Optional so this can be used to provide consistent page spacing
  children?: ReactNode;
}

const ActionPanel = ({ children }: Props) => {
  return <div className={styles.actionPanel}>{children}</div>;
};

export default ActionPanel;
