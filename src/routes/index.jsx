import FrontendLayout from "../layout/FrontendLayout";

import Home from "../pages/front/Home";
import Cart from "../pages/front/Cart";
import Checkout from "../pages/front/Checkout";
import Product from "../pages/front/Product";
import SingleProduct from "../pages/front/SingleProduct";
import Login from "../pages/admin/Login";
import DashBoard from "../pages/admin/DashBoard";
import NotFound from "../pages/NotFound";

const routes = [
  {
    path: "/",
    element: <FrontendLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "product",
        element: <Product />,
      },
      {
        path: "product/:id",
        element: <SingleProduct />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "dashboard",
    element: <DashBoard />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
