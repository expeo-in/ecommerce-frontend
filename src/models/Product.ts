interface Product {
  id: number;
  name: string;
  description: string;
  qty: number;
  price: number;
  imageUrl: string;
  isActive: boolean;
}

export interface ProductCreate {
  id: number;
  name: string;
  description: string;
  qty: number;
  price: number;
  image: any;
  isActive: boolean;
}

export default Product;
