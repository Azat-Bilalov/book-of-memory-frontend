import { useSelector } from "react-redux";
import { BindingSliceState } from ".";

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

export const useEnteredBindingId = () =>
  useSelector(
    (state: { binding: BindingSliceState }) => state.binding.enteredBindingId
  );
