import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import Product from "../models/Product";
import { Link } from "react-router-dom";
import useAuthStore from "./auth-store";
import httpClient from "../services/api-client";
import ProductService from "../services/product.service";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<any>({});
  const [isLoading, setLoading] = useState<boolean>(false);
  const { user } = useAuthStore();
  const productService = new ProductService();

  useEffect(() => {
    setLoading(true);
    productService
      .getAll()
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <h2>Products</h2>
      <div className="text-danger">{error.message}</div>
      {isLoading && <div className="spinner-border"></div>}
      <div>
        <Link to="/admin/products/create">Create</Link>
      </div>
      <table className="table table-striped table-responsive">
        <thead>
          <tr>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Active</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td>{p.name}</td>
              <td>{p.qty}</td>
              <td>{p.price}</td>
              <td>{p.isActive ? "Y" : "N"}</td>
              <td>
                <Link to={"/admin/products/" + p.id}>Details</Link> {"  "}
                <Link to={"/admin/products/edit/" + p.id}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ProductList;
