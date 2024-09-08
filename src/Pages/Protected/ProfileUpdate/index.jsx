import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FieldText from "../../../Components/FieldText";
import FieldNumber from "../../../Components/FieldNumber";
import PrimaryButton from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import { useAuth } from "../../../Context/auth";
import Modal from "../../../Components/Modal";
import { Button } from "@mui/material";
import "./index.css";
import { getUserById, patchUserById } from "../../../Services/userService";

const ProfileUpdate = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { state } = useLocation();
  const userId = state?.userId;
  const storagedUserString = localStorage.getItem("@App:user");
  const storagedUser = JSON.parse(storagedUserString);

  const [nome, setNome] = useState("");
  const [celular, setCelular] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [celularError, setCelularError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [perfilSelecionado, setPerfilSelecionado] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const response = await getUserById(storagedUser._id);
      setNome(response?.name);
      setCelular(response?.phone);
      setLogin(response?.status ? "Ativo" : "Inativo");
      setEmail(response?.email);
      setPerfilSelecionado(response?.role._id);
    };

    getUser();
  }, []);

  const handleNavigateToContributions = () => {
    navigate(`/movimentacoes/contribuicoes/${nome}`, {
      state: {
        userId,
        nome,
        celular,
        email,
        login,
        perfilSelecionado,
      },
    });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) =>
    /^\d+$/.test(phoneNumber) && phoneNumber.length >= 10;

  const removeMask = (celular) => celular.replace(/\D/g, "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate email
    if (!isValidEmail(email)) {
      setEmailError("*Insira um email válido");
      isValid = false;
    } else {
      setEmailError("");
    }

    // Validate phone number
    const unmaskedCelular = removeMask(celular);
    if (!validatePhoneNumber(unmaskedCelular)) {
      setCelularError("*Insira um celular válido");
      isValid = false;
    } else {
      setCelularError("");
    }

    if (!isValid) {
      return;
    }

    try {
      const updatedUser = {
        phone: celular,
        email: email,
      };
      await patchUserById(storagedUser._id, updatedUser);
      setOpenDialog(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    navigate("/home");
  };

  return (
    user && (
      <section className="container">
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
          <div className="double-box-pu">
            <FieldNumber
              label="Celular"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
              format="(##) #####-####"
            />
            {celularError && (
              <label className="isValidNumber">{celularError}</label>
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
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <label className="isValid">{emailError}</label>}
          </div>
          <div>
            <Button
              className="btn-contribution"
              onClick={handleNavigateToContributions}
            >
              Histórico de Contribuições
            </Button>
          </div>
          <div className="section-doublebtn">
            <SecondaryButton text="Cancelar" onClick={handleCancel} />
            <PrimaryButton text="Salvar" onClick={handleSubmit} />
          </div>
        </div>
        <Modal show={openDialog} alertTitle="Alterações Salvas">
          <Button onClick={handleCloseDialog} className="custom-dialog-button">
            OK
          </Button>
        </Modal>
      </section>
    )
  );
};

export default ProfileUpdate;
