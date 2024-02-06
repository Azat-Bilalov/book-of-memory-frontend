import { useSelector } from "react-redux";
import { BindingSliceState } from "./types";

export const useBindingsFilter = () => {
  const dateTo = useSelector(
    (state: { binding: BindingSliceState }) => state.binding.dateTo
  );
  const dateFrom = useSelector(
    (state: { binding: BindingSliceState }) => state.binding.dateFrom
  );
  const status = useSelector(
    (state: { binding: BindingSliceState }) => state.binding.status
  );
  const nameFilter = useSelector(
    (state: { binding: BindingSliceState }) => state.binding.nameFilter
  );
  return { dateTo, dateFrom, status, nameFilter };
};

export const useDocumentsInBasket = () =>
  useSelector(
    (state: { binding: BindingSliceState }) => state.binding.documentsInBasket
  );

export const useEnteredBindingId = () =>
  useSelector(
    (state: { binding: BindingSliceState }) => state.binding.enteredBindingId
  );

export const useSelectedVeteranId = () =>
  useSelector(
    (state: { binding: BindingSliceState }) => state.binding.selectedVeteranId
  );

export const useCreatedBindings = () =>
  useSelector(
    (state: { binding: BindingSliceState }) => state.binding.createdBindings
  );
