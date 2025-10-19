import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import SocialPage from './pages/SocialPage';
import PartnerPage from './pages/PartnerPage';
import AdminPage from './pages/AdminPage';
import AuthPage from './pages/AuthPage';
import NotFoundPage from './pages/NotFoundPage';

// Define routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'social',
        element: <SocialPage />,
      },
      {
        path: 'partner',
        element: <PartnerPage />,
      },
      {
        path: 'admin',
        element: <AdminPage />,
      },
      {
        path: 'auth/*',
        element: <AuthPage />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}