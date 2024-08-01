import "./index.css";
import { useAuth } from "../../../Context/auth";

export default function MembershipRequest() {
  const { user } = useAuth();

  return (
    user && <section>Página de listagem de solicitação de filiação</section>
  );
}
