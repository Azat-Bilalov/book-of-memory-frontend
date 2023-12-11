import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

export const useSession = () => {
  return useSelector((state: RootState) => state.session);
};

export const useAuth = () => {
  const session = useSession();
  return !!session;
};
