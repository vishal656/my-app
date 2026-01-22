import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SectionTitle from './components/SectionTitle';
import {
  About,
  HomeLayout,
  Error,
  Contact
} from './pages';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <Error />, ///Error Boundary
    children: [
      {
        index: true,
        element: <SectionTitle text="Welcome to home page"/>,
      },
      {
        path: 'about',
        element: <About />,
      },{
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
export default App;
