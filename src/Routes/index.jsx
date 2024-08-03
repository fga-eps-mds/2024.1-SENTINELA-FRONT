import { useContext } from "react";
import AuthContext from "../Context/auth";
import PublicRoutes from "./publicRoutes";
import ProtectedRoutes from "./protectedRoutes";

const Routes = () => {
  const { signed } = useContext(AuthContext);
  // const context = useContext(useAuth)

  return signed ? (
    <>
      <ProtectedRoutes />
      <PublicRoutes />
    </>
  ) : (
    <PublicRoutes />
  );
};

export default Routes;
