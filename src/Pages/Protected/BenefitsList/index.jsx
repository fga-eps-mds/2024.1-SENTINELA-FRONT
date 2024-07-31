import { useEffect, useState, useContext } from "react";
import AuthContext, { useAuth } from "../../../Context/auth";
import { useNavigate } from "react-router-dom";
import { APIUsers } from "../../../Services/BaseService";

export default function BenefitsList() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const { user } = useAuth();
  const storagedUserString = localStorage.getItem("@App:user");
  const storagedUser = JSON.parse(storagedUserString);

  const [nome, setNome] = useState("");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await APIUsers.get(`users/${storagedUser.user._id}`, {
          headers: { Authorization: `Bearer ${storagedUser.token}` },
        });
        setNome(response.data.name);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  });

  const handleRegister = () => {
    navigate("/usuarios/hub");
  };

  const handleBenefits = () => {
    navigate("/beneficios");
  };

  const handleLogout = () => {
    context.Logout();
    navigate("/");
  };

  return (
    user && (
      <section className="container">
        <h2>Lista de convenios </h2>
      </section>
    )
  );
}
