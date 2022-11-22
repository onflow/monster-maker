import Head from 'next/head';
import PageContainer from 'layout/PageContainer';
import HomePage from 'components/HomePage';
import NavPanel from 'layout/NavPanel';
import Button from 'components/Button';

const Home = () => {
  return (
    <PageContainer>
      <Head>
        <title>Monster Maker</title>
      </Head>

      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: '1',
        }}
      >
        <HomePage />
      </div>

      <NavPanel>
        <Button src="/images/ui/connect_button.png" width={576} height={208} />
      </NavPanel>
    </PageContainer>
  );
};

export default Home;
