import PageContainer from 'layout/PageContainer';
import InitializePage from 'components/InitializePage';
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
      <InitializePage />

      <NavPanel>
        <Button
          src="/images/ui/create_button_on.png"
          width={640}
          height={208}
          inactive
        />

        <Button
          src="/images/ui/view_button_off.png"
          width={640}
          height={208}
          onClick={handleView}
        />
      </NavPanel>
    </PageContainer>
  );
};

export default Create;
