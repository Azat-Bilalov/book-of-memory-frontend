import { useSelector } from "react-redux";
import { DocumentSliceState } from "./types";

export const useDocumentQuery = () =>
  useSelector(
    (state: { document: DocumentSliceState }) => state.document.query
  );
