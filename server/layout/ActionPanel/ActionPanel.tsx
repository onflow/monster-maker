import { ReactNode } from 'react';
import styles from './ActionPanel.module.css';

interface Props {
  children: ReactNode;
}

const ActionPanel = ({ children }: Props) => {
  return <div className={styles.actionPanel}>{children}</div>;
};

export default ActionPanel;
