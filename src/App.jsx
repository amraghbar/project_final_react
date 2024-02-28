
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

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      children: [
         {
          path: '*',
          element: <Notfound/>
        },
        {
          path: "/Home",
          element: <>
                    <Home/>
                    <Categories/>

          </>,
        },
        {
          path: "/Categories",
          element: <Categories/>,
        },
        {
          path: "/Products",
          element: <Products/>,
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
        
      ],
     
    },
   
  ]);
  return (
    <>
        <RouterProvider router={router} />
<h2>  وشيكولنا ع كبسة السلة والشخص :)</h2>
<p>وباقي الصفحات </p>
    </>
  )
}

export default App
