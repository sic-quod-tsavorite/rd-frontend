export type Duck = {
  _id: string;
  name: string;
  description: string;
  imageURL: string;
  price: number;
  onSale: boolean;
  discountPct: number;
  isHidden: boolean;
};

export type newDuck = Omit<Duck, "_id"> & {
  _createdBy?: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  registerDate: string;
};

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  imageURL: string;
};

export type OrderItems = {
  _id: string;
  orderDate: string;
  total: number;
  userName: string;
  orderStatus: string;
  orderNumber: number;
  orderLine: Array<{ duck: Duck; quantity: number }>;
};
