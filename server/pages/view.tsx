import PageContainer from 'layout/PageContainer';
import InitializePage from 'components/InitializePage';
import NavPanel from 'layout/NavPanel';
import Button from 'components/Button';
import { useRouter } from 'next/router';
import { ROUTES } from 'utils/constants';

const View = () => {
  const router = useRouter();

  const handleCreate = () => {
    // TODO: Create
    router.push(ROUTES.CREATE);
  };

  return (
    <PageContainer>
      <InitializePage />

      <NavPanel>
        <Button
          src="/images/ui/create_button_off.png"
          width={640}
          height={208}
          onClick={handleCreate}
        />

        <Button
          src="/images/ui/view_button_on.png"
          width={640}
          height={208}
          inactive
        />
      </NavPanel>
    </PageContainer>
  );
};

export default View;
