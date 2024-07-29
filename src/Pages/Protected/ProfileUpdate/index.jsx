import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import FieldText from "../../../Components/FieldText";
import FieldNumber from "../../../Components/FieldNumber";
import PrimaryButton from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import { useAuth } from "../../../Context/auth";
import AuthContext from "../../../Context/auth";
import { APIUsers } from "../../../Services/BaseService";
import { AiOutlineUser } from "react-icons/ai";
import { RiLogoutCircleRLine } from "react-icons/ri";
import Modal from "../../../Components/Modal";
import { Button } from "@mui/material";
import "./index.css";

const ProfileUpdate = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const { user } = useAuth();
  const storagedUserString = localStorage.getItem("@App:user");
  const storagedUser = JSON.parse(storagedUserString);

  const [nome, setNome] = useState("");
  const [celular, setCelular] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isValidNumber, setIsValidNumber] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await APIUsers.get(`users/${storagedUser.user._id}`, {
          headers: { Authorization: `Bearer ${storagedUser.token}` },
        });
        setNome(response.data.name);
        setCelular(response.data.phone);
        setLogin(response.data.status ? "Ativo" : "Inativo");
        setEmail(response.data.email);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    setIsEmailValid(isValidEmail(email));
  }, [email]);

  useEffect(() => {
    setIsValidNumber(validatePhoneNumber(removeMask(celular)));
  }, [celular]);

  const isValidEmail = (email) => {
    const allowedDomains = ["com", "net", "org", "com.br", "org.br"];
    const domainPattern = allowedDomains.join("|");
    const emailRegex = new RegExp(
      `^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.${domainPattern}$`,
      "i"
    );
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) =>
    /^\d+$/.test(phoneNumber) && phoneNumber.length >= 10;

  const removeMask = (celular) => celular.replace(/\D/g, "");

  const handleLogout = () => {
    context.Logout();
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidNumber || !isEmailValid) {
      return;
    }
    try {
      await APIUsers.patch(
        `users/patch/${storagedUser.user._id}`,
        {
          updatedUser: {

            phone: celular,
            email: email,
          }
        },
        {
          headers: { Authorization: `Bearer ${storagedUser.token}` },
        }
      );
      setCelular(celular);
      setEmail(email);
      setOpenDialog(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  const handleHome = () => {
    navigate("/home");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/home");
  };

  const buttons = [
    <SideButton key="home" text="PÁGINA INICIAL" onClick={handleHome} />,
    <SideButton key="filiacao" text="CADASTROS" />,
    <SideButton key="financeiro" text="FINANCEIRO" />,
    <SideButton key="beneficios" text="BENEFÍCIOS" />,
    <h2 key="loggedStatus" className="profile-status">
      Você está logado <br />
      como {nome} <AiOutlineUser className="profile-icon" />
    </h2>,
    <button key="logout" className="btn-logout" onClick={handleLogout}>
      {" "}
      LOGOUT <RiLogoutCircleRLine className="logout-icon" />{" "}
    </button>,
  ];

  return (
    user && (
      <section className="container">
        <SideBar className="side-menu" buttons={buttons} />
        <div className="campos-container">
          <h3 className="profile-view">Visualização de usuário</h3>
          <h4 className="personal-data">Dados pessoais</h4>
          <div className="section-campo">
            <FieldText
              label="Nome*"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              disabled={true}
            />
          </div>
          <div className="double-box">
            <FieldNumber
              label="Celular"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
              format="(##) #####-####"
            />
            {!isValidNumber && (
              <label className="isValidNumber">*Insira um celular válido</label>
            )}
            <FieldText
              label="Login*"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              disabled
            />
          </div>
          <div className="section-campo">
            <FieldText
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {!isEmailValid && (
              <label className="isEmailValid">*Insira um email válido</label>
            )}
          </div>
          <div className="section-doublebtn">
            <SecondaryButton text="Cancelar" onClick={handleCancel} />
            <PrimaryButton text="Salvar" onClick={handleSubmit} />
          </div>
        </div>
        <Modal
          show={openDialog}
          alertTitle={
            <div className="custom-alert-title">Alterações Salvas</div>
          }
          buttons={
            <Button
              onClick={handleCloseDialog}
              className="custom-dialog-button"
            >
              OK
            </Button>
          }
          width="338px"
        />
      </section>
    )
  );
};

export default ProfileUpdate;
