import Layout from '@/layout';
import Home from '@/pages/Home';
import Cart from '@/pages/Cart';
import PetDetails from '@/pages/PetDetails';
import FinancialControl from '@/pages/FinancialControl';
import { Routes, Route, Navigate } from 'react-router-dom';

const Index = () => {
  const routes = [
    { path: '/home', element: <Home /> },
    { path: '/cart', element: <Cart /> },
    { path: '/pet/:id', element: <PetDetails /> },
    { path: '/financial-control', element: <FinancialControl /> },

    { path: '/', element: <Navigate to="/home" /> },
  ];

  return (
    <Routes>
      {routes.map(({ element, path }) => (
        <Route key={path} element={<Layout>{element}</Layout>} path={path} />
      ))}
    </Routes>
  );
};

export default Index;
