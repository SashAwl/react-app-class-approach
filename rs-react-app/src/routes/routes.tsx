import { Navigate } from 'react-router-dom';
import { ItemDetails } from '../components/ItemDetails-tmp/ItemDetails';
import { About } from '../pages/About-tmp/About';
import { ItemDataLayout } from '../components/ItemDataLayout-tmp/ItemDataLayout';
import { NotFound } from '../pages/NotFound-tmp/NotFound';

const routes = [
  {
    path: '/characters/',
    element: <ItemDataLayout />,
    children: [
      {
        index: true,
        element: <p>Select from the list for detailed view</p>,
      },
      {
        path: ':itemId',
        element: <ItemDetails />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
  {
    path: '/',
    element: <Navigate to="/characters/" />,
  },
  {
    path: '/about',
    element: <About />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
