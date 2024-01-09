import ProductList from "./admin/ProductList";
import App from "./App";
import ProductForm from "./admin/ProductForm";
import { createBrowserRouter, createHashRouter } from "react-router-dom";
import ProductDetails from "./admin/ProductDetails";
import ProductEditForm from "./admin/ProductEditForm";
import AdminLayout from "./admin/AdminLayout";
import AdminHome from "./admin/AdminHome";
import AdminLogin from "./admin/AdminLogin";
import PrivateRoute from "./admin/PrivateRoute";
import { Children } from "react";
import Layout from "./Layout";
import Home from "./Home";
import ProductDetail from "./ProductDetail";
import Cart from "./Cart";

const router = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "", element: <Home /> },
      { path: "products/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
    ],
  },
  {
    path: "/admin",
    element: <PrivateRoute />,
    children: [
      {
        path: "",
        element: <AdminLayout />,
        children: [
          {
            path: "",
            element: <AdminHome />,
          },
          {
            path: "products",
            element: <ProductList />,
          },
          {
            path: "products/create",
            element: <ProductForm />,
          },
          {
            path: "products/:id",
            element: <ProductDetails />,
          },
          {
            path: "products/edit/:id",
            element: <ProductEditForm />,
          },
        ],
      },
    ],
  },
  {
    path: "/adminlogin",
    element: <AdminLogin />,
  },
]);
export default router;
