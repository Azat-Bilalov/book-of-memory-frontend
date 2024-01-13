import { DocumentDto } from "@/entities/document/api/types";
import { VeteranDto } from "@/entities/veteran/api/types";

export type ModeratorFromBindingDto = {
  moderator_id: string;
  first_name: string;
  last_name: string;
  email: string;
};

export type UserFromBindingDto = {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
};

export type BindingDto = {
  binding_id: string;
  status: string;
  created_at: string;
  formatted_at: string;
  ended_at: string;
  user_id: string;
  moderator_id: string;
  veteran_id: string;
  documents?: DocumentDto[];
  veteran: VeteranDto;
  moderator: ModeratorFromBindingDto;
  user: UserFromBindingDto;
};

export type QueryParams = {
  status?: string;
  date_to?: string;
  date_from?: string;
};
