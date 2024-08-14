import { useAuth } from "../../../../Context/auth";

const FinancialReport = () => {
  const { user } = useAuth();

  return user && <h1>US 22 - TESTE</h1>;
};
export default FinancialReport;
