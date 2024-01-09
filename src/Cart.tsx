import useCartStore from "./cart.store";
import { MdDelete } from "react-icons/md";

const Cart = () => {
  const { cart, deleteCartItem, incrementCartItem, decrementCartItem } =
    useCartStore();

  const getCartTotal = () => {
    let total = 0;
    for (let item of cart) {
      total += item.qty * item.price;
    }
    return total;
  };

  if (cart.length == 0) return <p className="p-3">No Items in Cart</p>;

  return (
    <>
      <h2>Shopping Cart</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((c) => (
            <tr>
              <td>
                <MdDelete
                  size={25}
                  onClick={() => deleteCartItem(c.id)}
                ></MdDelete>
              </td>
              <td>{c.name}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => decrementCartItem(c.id)}
                  disabled={c.qty == 1}
                >
                  -
                </button>
                <input type="text" value={c.qty} size={1} />
                <button
                  className="btn btn-primary"
                  onClick={() => incrementCartItem(c.id)}
                >
                  +
                </button>
              </td>
              <td>{c.price}</td>
              <td>{c.qty * c.price}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={4}>Total Amount</th>
            <th>{getCartTotal()}</th>
          </tr>
        </tfoot>
      </table>
      <div className="d-flex justify-content-end">
        <button className="btn btn-primary">Checkout</button>
      </div>
    </>
  );
};

export default Cart;
