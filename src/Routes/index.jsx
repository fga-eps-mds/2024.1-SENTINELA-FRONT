import { useContext } from "react";
import AuthContext from "../Context/auth";
import PublicRoutes from "./publicRoutes";
import ProtectedRoutes from "./protectedRoutes";

const Routes = () => {
  const { signed } = useContext(AuthContext);
  // const context = useContext(useAuth)

  console.log("signed: " + signed);

  return signed ? <ProtectedRoutes /> : <PublicRoutes />;
};

export default Routes;
