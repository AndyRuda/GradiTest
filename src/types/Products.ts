import { Media } from "./Media";
interface BaseProduct {
  id: number;
  title: string;
  available: boolean;
  price: number;
  compare_at_price: number;
  featured_image: string;
}

export interface Product extends BaseProduct {
  id: number;
  title: string;
  description: string;
  published_at: string | Date;
  created_at: string | Date;
  vendor: string;
  type: string;
  tags: string[];
  price: number;
  price_min: number;
  price_max: number;
  available: boolean;
  price_varied: boolean;
  compare_at_price: number;
  compare_at_price_max: number;
  compare_at_price_varies: boolean;
  variants: ProductVariant[];
  images: string[];
  options: Array<{ name: string; position: number; values: string[] }>;
  url: string;
  media: Array<Media>;
}

export interface ProductVariant extends BaseProduct {
  id: number;
  title: string;
  option1: string;
  option2: string;
  option3: string;
  sku: string;
  requires_shipping: boolean;
  taxable: boolean;
  name: boolean;
  public_title: boolean;
  options: string[];
  weight: number;
  inventory_management: string;
  barcode: string;
}
