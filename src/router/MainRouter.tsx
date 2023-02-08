import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import MainLayout from '../layout/MainLayout/MainLayout';
import MainScreen from '../screens/MainScreen/MainScreen';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <MainScreen />,
      },
    ],
  },
]);
export const MainRouter = () => {
  return <RouterProvider router={router} />;
};

export default MainRouter;
