import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Landing from './pages/landing';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;