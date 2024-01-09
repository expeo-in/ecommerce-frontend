import useCartStore from "./cart.store";

const Cart = () => {
  const { cart } = useCartStore();

  return (
    <>
      <h2>Shopping Cart</h2>
      <table className="table">
        <tr>
          <th>Name</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total Price</th>
        </tr>
        {cart.map((c) => (
          <tr>
            <td>{c.name}</td>
            <td>{c.qty}</td>
            <td>{c.price}</td>
            <td>{c.qty * c.price}</td>
          </tr>
        ))}
      </table>
    </>
  );
};

export default Cart;
