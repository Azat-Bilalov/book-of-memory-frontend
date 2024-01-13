export type Veteran = {
  id: string;
  firstName: string;
  lastName: string;
  patronymic: string;
  birthDate: string;
  imageUrl: string;
  createdAt: string;
};

export type VeteranSliceState = {
  query: string;
};
