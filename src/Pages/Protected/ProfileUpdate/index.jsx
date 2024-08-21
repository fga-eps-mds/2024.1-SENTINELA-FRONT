import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
      const response = await getUserById(storagedUser._id);
      setNome(response?.name);
      setCelular(response?.phone);
      setLogin(response?.status ? "Ativo" : "Inativo");
      setEmail(response?.email);
    };

    getUser();
  });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidNumber || !isEmailValid) {
      return;
    }
    try {
      const updatedUser = {
        phone: celular,
        email: email,
      };
      await patchUserById(storagedUser._id, updatedUser);
      setCelular(celular);
      setEmail(email);
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
