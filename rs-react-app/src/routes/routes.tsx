import { ItemDetails } from '../components/ItemDetails/ItemDetails';
import { About } from '../pages/about/About';
import { ItemDataLayout } from '../components/itemDataLayout/ItemDataLayout';
import { NotFound } from '../pages/notFound/NotFound';

const routes = [
  {
    path: '/',
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
