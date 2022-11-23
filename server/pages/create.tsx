import PageContainer from 'layout/PageContainer';
import CreatePage from 'components/CreatePage';
import NavPanel from 'layout/NavPanel';
import Button from 'components/Button';
import { useRouter } from 'next/router';
import { ROUTES } from 'utils/constants';

const Create = () => {
  const router = useRouter();

  const handleView = () => {
    // TODO: View
    router.push(ROUTES.VIEW);
  };

  return (
    <PageContainer>
      <CreatePage />

      <NavPanel>
        <Button
          src="/images/ui/create_button_on.png"
          width={640}
          height={208}
          inactive
          alt="Create NFT"
        />

        <Button
          src="/images/ui/view_button_off.png"
          width={640}
          height={208}
          onClick={handleView}
          alt="View NFTs"
        />
      </NavPanel>
    </PageContainer>
  );
};

export default Create;
