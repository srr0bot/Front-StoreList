import { Helmet } from 'react-helmet-async';

import useDynamicMenu from 'src/layouts/dashboard/config-navigation';

import RegisterView from 'src/sections/login/register-view';

// ----------------------------------------------------------------------

export default function RegisterPage() {
  const { isAdmin } = useDynamicMenu();
  return (
    <>
      <Helmet>
        <title> Register | Minimal UI </title>
      </Helmet>

      <RegisterView isAdmin={isAdmin} />
      
    </>
  );
}
