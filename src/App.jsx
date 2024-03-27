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
import Profile from "./assets/Pages/Profile/Profile";
import Review from "./assets/Pages/review/Review";
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
          element: (
            <PRoutes>
              <Caprodut />
            </PRoutes>
          ),
        },
        {
          path: "/Products",
          element: <Products />,
        },
        {
          path: "/Categories/:id/products/:id",
          element: (
            <PRoutes>
              <Produtc />{" "}
            </PRoutes>
          ),
        },
        {
          path: "/sendcode",
          element: <Sendcode />,
        },
        {
          path: "/ForgetPassword",
          element: <ForgetPassword />,
        },
        {
          path: "/Profile",
          element: (
            <PRoutes>
              <Profile />{" "}
            </PRoutes>
          ),
        },
        {
          path: "/cart",
          element: (
            <PRoutes>
              <Carshop />
            </PRoutes>
          ),
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
          path: "/Order",
          element: (
            <PRoutes>
              <Order />
            </PRoutes>
          ),
        },
        {
          path: "/products/:id/review",
          element: (
            <PRoutes>
              <Review />
            </PRoutes>
          ),
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
