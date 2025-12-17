export interface Category {
  id: number;
  name: string;
  parent_id: number | null;
}

export interface Product {
  id: number;
  name: string;
  category_id: number | null;
  price: number;
  fullPrice: number;
  description: string;
  images: string[];
}
