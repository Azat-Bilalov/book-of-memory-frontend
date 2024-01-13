import { Veteran } from "@/entities/veteran/model";
import { Document } from "../../document/model/types";

export type BindingSliceState = {
  dateTo: string;
  dateFrom: string;
  status: string;
  nameFilter: string;
  enteredBindingId: string | null;
};

export type ModeratorFromBinding = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type UserFromBinding = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type Binding = {
  id: string;
  status: string;
  createdAt: string;
  formattedAt: string;
  endedAt: string;
  userId: string;
  moderatorId: string;
  veteranId: string;
  documents?: Document[];
  veteran?: Veteran;
  moderator?: ModeratorFromBinding;
  user?: UserFromBinding;
};
