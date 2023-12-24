import { DocumentDto } from "@/entities/document/api/types";

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
};

export type QueryParams = {
  status?: string;
  date_to?: string;
  date_from?: string;
};
