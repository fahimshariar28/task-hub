import { Outlet } from "react-router-dom";
import NavBar from "../Pages/Shared/Navbar";

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
    </div>
  );
};

export default MainLayout;
