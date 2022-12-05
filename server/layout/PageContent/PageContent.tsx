import { ReactNode } from 'react';
import styles from './PageContent.module.css';

interface Props {
  children: ReactNode;
}

const PageContent = ({ children }: Props) => {
  return <div className={styles.main}>{children}</div>;
};

export default PageContent;
