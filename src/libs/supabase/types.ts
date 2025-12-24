export interface Category {
  id: number;
  name: string;
  description: string;
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
  developer: string;
  area: number;
  floors: number;
}

export interface ProductToDisplay extends Product {
  formattedPrice: string;
  formattedFullPrice?: string;
  attributes: {
    Area: number;
    Developer: string;
    Floors: number;
  };
}

export interface UserData {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  addresses: Address[];
  sameAddress: boolean;
  setAsDefaultShipping: boolean;
  setAsDefaultBilling: boolean;
}
interface Address {
  id: string;
  streetName: string;
  city: string;
  country: string;
  postalCode: string;
}
