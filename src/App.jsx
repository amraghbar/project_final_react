
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './assets/Pages/Root';
import Home from './assets/Pages/Home/Home';
import Categories from './assets/Pages/Categories/Categories';
import Products from './assets/Pages/Products/Products';
import Carshop from './assets/Pages/Carts/Carshop';
import Signin from './assets/Pages/Navbar/butoon/Signin';
import Signup from './assets/Pages/Navbar/butoon/Signup';
import Notfound from './assets/Pages/Notfouend/Notfound';
import Produtc from './assets/Pages/Produtc/Produtc';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      children: [
        {
          path:'/',
          element: <Home/>,
        },
        {
          path: "/Home",
          element: <Home/>,
        
        },
        {
          path: "/Categories",
          element: <Categories/>,
        },
        {
          path: "/Products/:id",
          element: <Products/>,
        },
        {
          path: "/Products/:id/Produtc/:id",
          element: <Produtc/>,
        },
        {
          path: "/Carshop",
          element: <Carshop/>,
        },
        {
          path: "/signin",
          element: <Signin/>,
        }, 
        {
          path: "/signup",
          element: <Signup/>,
        },
        {
          path: '*',
          element: <Notfound/>,
        }
      ],
    },
  ]);
 
  return (
    <>
        <RouterProvider router={router} />

    </>
  )
}

export default App
