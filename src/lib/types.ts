export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // cents?
  currency: string;
  category: string;
  images: string[];
  featured: boolean;
  tags: string[];
  createdAt: string;
};

export type StockInfo = {
  productId: string;
  stock: number;
  inStock: boolean;
  lowStock: boolean;
};

export type Category = {
  slug: string;
  name: string;
  productCount: number;
};

export type Promotion = {
  id: string;
  title: string;
  description: string;
  discountPercent: number;
  code: string;
  validFrom: string;
  validUntil: string;
  active: boolean;
};

export type CartItem = {
  id: string;
  productId: string;
  quantity: number;
  addedAt: string;
  product: Product;
  lineTotal: number; // cents?
};

export type Cart = {
  token: string;
  items: CartItem[];
  totalItems: number;
  subtotal: number; // cents?
  currency: string;
  createdAt: string;
  updatedAt: string;
};

export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type StoreConfig = {
  storeName: string;
  currency: string;
  features: Record<string, boolean>;
  socialLinks: {
    twitter?: string;
    github?: string;
    discord?: string;
  };
  seo: {
    title: string;
    description: string;
  };
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  meta?: { pagination: PaginationMeta };
};