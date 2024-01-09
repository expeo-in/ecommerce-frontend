import { useRef } from "react";
import Product from "./models/Product";
import useCartStore from "./cart.store";
import { useToast } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Card = (props: any) => {
  const p: Product = props.product;
  const imageBaseUrl = "https://localhost:7058/images/products/";
  const qtyRef = useRef<HTMLInputElement>(null);
  const { addCartItem } = useCartStore();
  const toast = useToast();

  const handleClick = () => {
    if (qtyRef.current != null) {
      let cartItem = {
        id: p.id,
        name: p.name,
        qty: parseInt(qtyRef.current.value),
        price: p.price,
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
  };

  return (
    <div className="card home-card mb-3 me-3">
      <Link to={"/products/" + p.id}>
        <img
          src={imageBaseUrl + p.imageUrl}
          className="card-img-top"
          alt="..."
        />
      </Link>
      <div className="card-body">
        <h5 className="card-title">
          <Link to={"/products/" + p.id}>{p.name}</Link>
        </h5>
        <p className="card-text">{p.description}</p>
        <h6 className="card-subtitle mb-2 text-body-secondary">
          <span className="d-inline-block me-3">$ {p.price}</span>
          <span className="d-inline-block">In Stock - {p.qty}</span>
        </h6>
        <input type="number" value={1} min={1} ref={qtyRef}></input>
        <button className="btn btn-primary" onClick={handleClick}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
