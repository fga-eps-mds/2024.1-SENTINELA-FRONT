import React, { useEffect, useState, useContext } from "react";
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

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import "./index.css";

const ProfileUpdate = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate(); 
  const { user } = useAuth();
  const storagedUserString = localStorage.getItem('@App:user'); // Usuario logado
  const storagedUser = JSON.parse(storagedUserString); // Usuario logado => JSON

  const [nome, setNome] = useState('');
  const [celular, setCelular] = useState('');
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => { // Busca usuario no banco
    try {
      const response = await APIUsers.get(`users/${storagedUser.user._id}`, {
        headers: { 'Authorization': `Bearer ${storagedUser.token}` }
      });
      setNome(response.data.name);
      setCelular(response.data.phone);
      setLogin(response.data.status);
      setEmail(response.data.email);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    context.Logout();
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await APIUsers.patch(`users/patch/${storagedUser.user._id}`, {
        phone: celular
      }, {
        headers: { 'Authorization': `Bearer ${storagedUser.token}` }
      });
      setCelular(celular);
      setOpenDialog(true); // Abre o Dialog após a conclusão do cadastro
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
    <h2 className="profile-status">Você está logado <br />como {nome} <AiOutlineUser className="profile-icon" /></h2>,
    <button className="btn-logout" onClick={handleLogout}> LOGOUT </button>
  ];

  return user && (
    <section className="container">
      <SideBar className="side-menu" buttons={buttons} />
      <div className="campos-container">
        <h3 className="profile-view">Visualização de usuário</h3>
        <h4 className="personal-data">Dados pessoais</h4>
        <div className="section-campo">
          <FieldText label="Nome*" value={nome} onChange={(e) => setNome(e.target.value)} disabled />
        </div>
        <div className="double-box">
          <FieldNumber label="Celular" value={celular} onChange={(e) => setCelular(e.target.value)} format="(##) #####-####" />
          <FieldText label="Login*" value={login} onChange={(e) => setLogin(e.target.value)} disabled />
        </div>
        <div className="section-campo">
          <FieldText label="E-mail*" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
        </div>
        <div className="section-sector">
          <FieldText label="Setores de acesso*" value={""} disabled />
        </div>
        <div className="section-doublebtn">
          <SecondaryButton text="Cancelar" onClick={handleCancel} />
          <PrimaryButton text="Salvar" onClick={handleSubmit} />
        </div>
      </div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="custom-dialog"
      >
        <DialogTitle className="alert-dialog-title">{"Alterações Salvas"}</DialogTitle>
        <DialogContent>
          
        </DialogContent>
        <DialogActions>
        <Button onClick={handleCloseDialog} className="custom-dialog-button">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default ProfileUpdate;
