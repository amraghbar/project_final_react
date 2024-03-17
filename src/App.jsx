import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./assets/Pages/Root";
import Home from "./assets/Pages/Home/Home";
import Categories from "./assets/Pages/Categories/Categories";
import Products from "./assets/Pages/Products/Products";
import Carshop from "./assets/Pages/Carts/Carshop";
import Signin from "./assets/Pages/Navbar/butoon/Signin";
import Signup from "./assets/Pages/Navbar/butoon/Signup";
import Notfound from "./assets/Pages/Notfouend/Notfound";
import Produtc from "./assets/Pages/Produtc/Produtc";
import PRoutes from "./assets/Pages/auth/PRoutes";
import UserContextProvider from "./assets/Context/User";
import Caprodut from "./assets/Pages/Categories/Caprodut";
import Sendcode from "./assets/Pages/ForgetPass/Sendcode";
import ForgetPassword from "./assets/Pages/ForgetPass/ForgetPassword";
import Order from "./assets/Pages/Order/Order";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/Home",
          element: <Home />,
        },
        {
          path: "/Categories",
          element: <Categories />,
        },
        {
          path: "/Categories/:id",
          element: <Caprodut />,
        },
        {
          path: "/Products",
          element: <Products />,
        },
        {
          path: "/Categories/:id/Produtc/:id",
          element: <Produtc />,
        },
        {
          path:"/sendcode",
          element:<Sendcode/>
        },
        {
          path:"/ForgetPassword",
          element:<ForgetPassword/>,
        },
        {
          path: "/cart",
          element:
              <Carshop />
          ,
        },
        {
          path: "/signin",
          element: <Signin />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
        {
          path:"/Order",
          element: <Order />,

        },
        {
          path: "*",
          element: <Notfound />,
        },
      ],
    },
  ]);

  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </>
  );
}

export default App;
