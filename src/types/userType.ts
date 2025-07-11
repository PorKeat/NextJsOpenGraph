export type UserType = {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
  age: string;
  gender: string;
  birthDate: string;
  address: {
    country: string;
  };
  email: string;
  image: string;
};

export type UserDetailType = {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  image: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phoneNumber: string;
  website: string;
};
