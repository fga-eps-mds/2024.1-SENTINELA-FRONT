import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FieldSelect from "../../../../Components/FieldSelect";
import FieldText from "../../../../Components/FieldText";
import Modal from "../../../../Components/Modal";
import PrimaryButton from "../../../../Components/PrimaryButton";
import SecondaryButton from "../../../../Components/SecondaryButton";
import { createUser, getRoles } from "../../../../Services/userService";
import "./index.css";
import {
  isValidCelular,
  isValidEmail,
  mascaraTelefone,
} from "../../../../Utils/validators";

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

  const handleCelularChange = (e) => {
    const value = e.target.value;
    const formattedValue = mascaraTelefone(value);
    setCelular(formattedValue);
  };

  const handleSubmit = async () => {
    const trimmedCelular = celular.replace(/\D/g, "");
    const { isValid: isValidNumber, message: celularMessage } =
      isValidCelular(trimmedCelular);
    const { isValid: isValidEmailAddress, message: emailMessage } =
      isValidEmail(email);

    setIsCelularValid(isValidNumber);
    setIsEmailValid(isValidEmailAddress);

    if (!isValidNumber || !isValidEmailAddress) {
      if (!isValidNumber) {
        console.error(celularMessage);
      }
      if (!isValidEmailAddress) {
        console.error(emailMessage);
      }
      return;
    }

    const userData = {
      name: nomeCompleto,
      email: email,
      phone: trimmedCelular,
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
          <FieldText
            label="Celular*"
            value={celular}
            onChange={handleCelularChange}
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
          {roles
            ?.filter((perfil) => perfil?.name !== "sindicalizado")
            .map((perfil) => (
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
