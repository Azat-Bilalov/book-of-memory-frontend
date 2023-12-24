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
  return { dateTo, dateFrom, status };
};

export const useEnteredBindingId = () =>
  useSelector(
    (state: { binding: BindingSliceState }) => state.binding.enteredBindingId
  );
