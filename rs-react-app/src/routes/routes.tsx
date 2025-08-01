import { ItemDetails } from '../components/ItemDetails/ItemDetails';
import { About } from '../pages/About/About';
import { ItemDataLayout } from '../components/ItemDataLayout/ItemDataLayout';
import { NotFound } from '../pages/NotFound/NotFound';

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
    path: '/about',
    element: <About />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
