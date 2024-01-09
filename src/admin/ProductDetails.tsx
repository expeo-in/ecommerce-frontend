import { Link, useParams } from "react-router-dom";
import Product from "../models/Product";
import { useEffect, useState } from "react";
import axios from "axios";
import httpClient from "../services/api-client";
import ProductService from "../services/product.service";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const productService = new ProductService();

  useEffect(() => {
    productService.getById(id).then((res) => setProduct(res.data));
  }, []);

  return (
    <>
      <h2>Product Details</h2>
      {product && (
        <div>
          <h2>{product?.name}</h2>
          <div>
            <img
              src={
                "https://localhost:7058/images/products/" + product?.imageUrl
              }
              style={{ width: "200px", height: "200px" }}
            ></img>
          </div>
          <div>{product?.description}</div>
          <div>Qty: {product?.qty}</div>
          <div>Price: {product?.price}</div>
        </div>
      )}
      <div>
        <Link to="/admin/products">Back to Products</Link>
      </div>
    </>
  );
};

export default ProductDetails;
