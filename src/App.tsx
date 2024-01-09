import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import ProductForm from "./admin/ProductForm";
import ProductList from "./admin/ProductList";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <h1>Ecommerce Front End</h1>
      <Link className="nav-link" to="/adminlogin">
        Admin Login
      </Link>
      {/* <ProductList></ProductList>
      <ProductForm></ProductForm> */}
    </>
  );
}

export default App;
