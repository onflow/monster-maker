import { ReactNode } from 'react';
import styles from './PageContainer.module.css';
import Head from 'next/head';
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
