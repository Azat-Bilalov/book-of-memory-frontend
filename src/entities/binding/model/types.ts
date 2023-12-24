import { Document } from "../../document/model/types";

export type BindingSliceState = {
  dateTo: string;
  dateFrom: string;
  status: string;
  enteredBindingId: string | null;
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
};
