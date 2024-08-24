import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FieldNumber from "../../../../Components/FieldNumber";
import FieldSelect from "../../../../Components/FieldSelect";
import FieldText from "../../../../Components/FieldText";
import Modal from "../../../../Components/Modal";
import PrimaryButton from "../../../../Components/PrimaryButton";
import SecondaryButton from "../../../../Components/SecondaryButton";
import { createUser, getRoles } from "../../../../Services/userService";
import "./index.css";

export default function UserCreatePage() {
  const navigate = useNavigate();
  const [nomeCompleto, setNomeCompleto] = useState("");
  const [celular, setCelular] = useState("");
  const [login, setLogin] = useState("");
  const [email, setEmail] = useState("");
  const [perfilSelecionado, setPerfilSelecionado] = useState("");
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isCelularValid, setIsCelularValid] = useState(true);

  const login_options = ["Ativo", "Inativo"];

  const handleChangeLogin = (event) => {
    setLogin(event.target.value);
  };

  const handlePerfilChange = (event) => {
    setPerfilSelecionado(event.target.value);
  };

  const handleNomeCompletoChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");
    setNomeCompleto(value);
  };

  const handleCloseDialog = () => {
    setShowModal(false);
    navigate("/usuarios");
  };

  const handleSubmit = async () => {
    const trimmedCelular = removeMask(celular);
    const isValidNumber =
      /^\d+$/.test(trimmedCelular) && trimmedCelular.length > 10;
    const isValidEmailAddress = isValidEmail(email);

    setIsCelularValid(isValidNumber);
    setIsEmailValid(isValidEmailAddress);

    if (!isValidNumber || !isValidEmailAddress) {
      return;
    }

    const userData = {
      name: nomeCompleto,
      email: email,
      phone: celular,
      status: login === "Ativo",
      role: perfilSelecionado,
    };

    try {
      await createUser(userData);
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao criar usuário", error);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const removeMask = (celular) => celular.replace(/\D/g, "");

  useEffect(() => {
    const loadRoles = async () => {
      const roles = await getRoles();
      setRoles(roles);
    };
    loadRoles();
  }, []);

  return (
    <section className="container-user">
      <div className="forms-container-user">
        <h1>Cadastro de usuário</h1>
        <h3>Dados Pessoais</h3>
        <FieldText
          label="Nome Completo*"
          value={nomeCompleto}
          onChange={handleNomeCompletoChange}
        />

        <div className="double-box-user">
          <FieldNumber
            label="Celular*"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            format="(##) ##### ####"
          />
          <FieldSelect
            label="Status*"
            value={login}
            onChange={handleChangeLogin}
            options={login_options}
          />
        </div>
        {!isCelularValid && (
          <label className="isValid">
            *Verifique se o número de celular inserido está completo
          </label>
        )}
        <FieldText
          label="Email*"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {!isEmailValid && (
          <label className="isValid">*Insira um email válido</label>
        )}
        <h3>Perfil</h3>
        <RadioGroup
          className="perfil-radiogroup"
          value={perfilSelecionado}
          onChange={handlePerfilChange}
        >
          {roles?.map((perfil) => (
            <FormControlLabel
              key={perfil?.name}
              value={perfil?._id}
              control={<Radio />}
              label={perfil?.name}
            />
          ))}
        </RadioGroup>
        <PrimaryButton text="Cadastrar" onClick={handleSubmit} />
        <Modal
          width="338px"
          alertTitle="Cadastro de usuário concluído"
          show={showModal}
        >
          <SecondaryButton
            key={"modalButtons"}
            text="OK"
            onClick={handleCloseDialog}
            width="338px"
          />
        </Modal>
      </div>
    </section>
  );
}
