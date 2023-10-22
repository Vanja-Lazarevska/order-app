export interface Product {
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
}


export interface ProductUpdate {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
}
