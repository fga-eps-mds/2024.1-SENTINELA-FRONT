import { useContext } from "react";
import AuthContext, { useAuth } from "../../../Context/auth";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";


const Home = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();

  const { user } = useAuth();

  const buttons = [
    <SideButton key="home" text="PÁGINA INICIAL"/>,
    <SideButton key="filiacao" text="CADASTROS" />,
    <SideButton key="financeiro" text="FINANCEIRO" />,
    <SideButton key="beneficios" text="BENEFÍCIOS" />,
];

  return (
    user && (
      <section className="container">
        <SideBar className="side-menu" buttons={buttons} />
      </section>
    )
  );
};

export default Home;
