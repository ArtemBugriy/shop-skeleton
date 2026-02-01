export interface ProductInterface {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  stock?: number;
  privewImage?: string | null;
  fullImage?: string | null;
}
