import { useHistory } from 'react-router';
import { useIonRouter } from '@ionic/react';

export const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  const history = useHistory();

  console.log(history);

  // if (loading) {
  //   return null;
  // }

  if (!token) {
    console.log('protected routes -> /landing');
    history.replace('/landing');
  } else {
    history.replace('/tabs/home');
  }

  return <>{children}</>;
};
