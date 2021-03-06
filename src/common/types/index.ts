type Image = {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  url: string;
  formats?: any;
};

type SmokeProduct = {
  created_at: string;
  id: number;
  image: Image | any;
  manufacturer: number;
  published_at: string;
  session: unknown | null;
  updated_at: string;
};

type Manufacturer = {
  created_at: string;
  id: number;
  image: Image | any;
  name: string;
  published_at: string;
  smoke_products: SmokeProduct[];
  description: string;
};

export { SmokeProduct, Manufacturer };
