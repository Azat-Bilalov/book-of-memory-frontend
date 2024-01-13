import { useSelector } from "react-redux";
import { SessionSliceState } from "./types";

export const useIsAuth = () =>
  useSelector(
    (state: { session: SessionSliceState }) => state.session.isAuthorized
  );

export const useRole = () =>
  useSelector((state: { session: SessionSliceState }) => state.session.role);

export const useName = () =>
  useSelector(
    (state: { session: SessionSliceState }) =>
      `${state.session.firstName} ${state.session.lastName}`
  );

export const useUserId = () =>
  useSelector((state: { session: SessionSliceState }) => state.session.userId);
