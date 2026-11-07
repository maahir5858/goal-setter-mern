import { createBrowserRouter, RouterProvider, Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Header from './components/Header';

const Layout = () => (
  <div className="container">
    <Header />
    <Outlet />
  </div>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: '/', element: <Dashboard/> },            // { index: true, ...}  -->  matches  -->  { path: '/', ...}
      { path: 'register', element: <Register/> },
      { path: 'login', element: <Login/> },
      { path: '*', element: <NotFound/> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />;
      <ToastContainer />
    </>
  )
}

export default App
