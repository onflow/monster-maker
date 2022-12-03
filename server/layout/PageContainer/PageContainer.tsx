import Head from 'next/head';
import { ReactNode } from 'react';
import styles from './PageContainer.module.css';

interface Props {
  children: ReactNode;
}

const PageContainer = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>Monster Maker</title>
      </Head>
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default PageContainer;
