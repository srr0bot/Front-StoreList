import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import RegisterPage from 'src/pages/register';
import DashboardLayout from 'src/layouts/dashboard';


export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const SalesPage = lazy(() => import('src/pages/sales'));

// ----------------------------------------------------------------------

export default function Router() {


  const routes = useRoutes([
    {
      path: '/',
      element: <LoginPage />,
    },
    {
      path: 'app',
      element: (
        <DashboardLayout>
          <IndexPage />
        </DashboardLayout>
      ),
    },
    {
      element: (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'sales', element: <SalesPage />},
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'register',
      element: <RegisterPage/>,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
