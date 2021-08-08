import { useHistory } from 'react-router-dom';
export const useRedirect = () => {
  const history = useHistory();
  return (to: string) => {
    if (!to.startsWith('/')) {
      to = `/${to}`;
    }
    history.push(to);
  };
};
