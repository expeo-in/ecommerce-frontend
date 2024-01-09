import { Link, Outlet } from "react-router-dom";
import useCartStore from "./cart.store";
import { BsCart2 } from "react-icons/bs";
import { Badge } from "@chakra-ui/react";

const Layout = () => {
  const { cart } = useCartStore();
  return (
    <div className="container">
      <header>
        <div className="d-flex flex-column flex-md-row justify-content-between pt-3">
          <h1>Ecommerce Website</h1>
          <div className="d-flex flex-row">
            <Link to="/cart">
              <BsCart2 size={30} />
              <span className="badge rounded-pill text-bg-primary cart-badge">
                {cart.length}
              </span>
            </Link>
          </div>
        </div>

        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin/products">
                    Products
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer>&copy; Ecommerce Website</footer>
    </div>
  );
};

export default Layout;
