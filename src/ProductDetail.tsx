import { useParams } from "react-router-dom";
import ProductService from "./services/product.service";
import { useEffect, useRef, useState } from "react";
import Product from "./models/Product";
import useCartStore from "./cart.store";
import { useToast } from "@chakra-ui/react";

const ProductDetail = () => {
  const { id } = useParams();
  const productService = new ProductService();
  const [product, setProduct] = useState<Product>();
  const imageBaseUrl = "https://localhost:7058/images/products/";

  const qtyRef = useRef<HTMLInputElement>(null);
  const { addCartItem } = useCartStore();
  const toast = useToast();

  const handleClick = () => {
    if (qtyRef.current != null) {
      if (product) {
        let cartItem = {
          id: product.id,
          name: product.name,
          qty: parseInt(qtyRef.current.value),
          price: product.price,
        };
        addCartItem(cartItem);
        toast({
          title: "Shopping Cart.",
          description: "Product added to cart.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  useEffect(() => {
    productService.getById(id).then((res) => setProduct(res.data));
  });

  let content = "";
  if (product) {
  }

  return (
    <>
      <h2>{product?.name}</h2>
      <div className="d-flex flex-column flex-md-row">
        <img
          src={imageBaseUrl + product?.imageUrl}
          alt="..."
          className="me-5 mb-3"
        />
        <div>
          <p>{product?.description}</p>
          <p>$ {product?.price}</p>
          <p>In Stock - {product?.qty}</p>
          <div>
            <input type="number" value={1} min={1} ref={qtyRef}></input>
          </div>
          <button className="btn btn-primary" onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
