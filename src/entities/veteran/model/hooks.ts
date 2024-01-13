import { useSelector } from "react-redux";
import { VeteranSliceState } from "./types";

export const useVeteranQuery = () =>
  useSelector((state: { veteran: VeteranSliceState }) => state.veteran.query);
