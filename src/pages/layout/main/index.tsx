import { Outlet } from "react-router-dom";
import { Header } from "@/widgets/header";

const MainLayout: React.FC = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default MainLayout;
