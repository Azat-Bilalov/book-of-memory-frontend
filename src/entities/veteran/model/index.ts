export type VeteranModel = {
  id: string;
  name: string;
  birthDate: string;
  imageUrl: string;
};

export type VeteranApi = {
  veteran_id: string;
  name: string;
  birth_date: string;
  image_url: string;
};

export const normalizeVeteran = (from: VeteranApi): VeteranModel => ({
  id: from.veteran_id,
  name: from.name,
  birthDate: from.birth_date,
  imageUrl: from.image_url,
});
