import { useEffect, useState } from "react";
import ProductService from "./services/product.service";
import Product from "./models/Product";
import Card from "./Card";

const Home = () => {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [bannerProducts, setBannerProducts] = useState<Product[]>([]);
  const imageBaseUrl = "https://localhost:7058/images/products/";
  let productService = new ProductService();

  useEffect(() => {
    productService.getAll().then((res) => {
      setLatestProducts(res.data.slice(0, 6));
      setBannerProducts(res.data.slice(0, 6));
    });
  }, []);

  return (
    <>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner home-slide">
          {bannerProducts.map((p) => (
            <div className="carousel-item active" key={p.id}>
              <img
                src={imageBaseUrl + p.imageUrl}
                className="d-block w-100"
                alt="..."
              />
              <div className="carousel-caption d-none d-md-block">
                <h5>{p.name}</h5>
              </div>
            </div>
          ))}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <section>
        <header>
          <h2>Latest Products</h2>
        </header>
        <div className="d-flex flex-column flex-md-row flex-wrap">
          {latestProducts.map((p) => (
            <Card product={p} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Home;
