import { VeteranDto } from "../api/types";
import { Veteran } from "../model";

export const normalizeVeteran = (veteran: VeteranDto): Veteran => {
  return {
    id: veteran.veteran_id,
    firstName: veteran.first_name,
    lastName: veteran.last_name,
    patronymic: veteran.patronymic,
    birthDate: veteran.birth_date,
    imageUrl: veteran.image_url,
    createdAt: veteran.created_at,
  };
};
