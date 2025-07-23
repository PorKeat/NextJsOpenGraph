export type ProductType = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: {
    id: number;
    name: string;
  };
};

export type CartItems = {
  id: number;
  title: string;
  description: string;
  price: number;
  category: {
    id: number;
    name: string;
  };
  images: string[];
  quantity: number;
};

export type ProductDetailType = {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  discountPercentage: number;
  stock: number;
  category: {
    id: number;
    name: string;
  };
  reviews: Reviews[];
};

export type Reviews = {
  rating: number;
  comment: string;
  date: number;
  receiverName: string;
  reviewerEmail: string;
};
