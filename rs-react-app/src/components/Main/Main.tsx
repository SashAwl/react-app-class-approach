import { useRoutes } from 'react-router-dom';
import routes from '../../routes/routes';

export const Main = () => {
  const element = useRoutes(routes);
  return <main> {element}</main>;
};
