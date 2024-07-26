import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../Context/auth";
import { useAuth } from "../../../Context/auth";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import PrimaryButton from "../../../Components/PrimaryButton";
import FieldSelect from "../../../Components/FieldSelect";
import FieldText from "../../../Components/FieldText";
import "./index.css";
import { createBankAccount } from "../../../Services/bankAccountService";

const BankAccount = () => {
    const [name, setName] = useState("");
    const [pix, setPix] = useState("");
    const [bank, setBank] = useState("");
    const [accountType, setAccountType] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [dv, setDv] = useState("");
    const [status, setStatus] = useState("");
    const [agency, setAgency] = useState("");
    
    const context = useContext(AuthContext);
    const { user } = useAuth();
    const navigate = useNavigate();

    const listAccountType = ['Conta Corrente', 'Poupança', 'Investimento', 'Caixa'];
    const listStatus = ['Ativo', 'Inativo'];

    const handleChangeAccountType = (e) => {
        setAccountType(e.target.value);
    };

    const handleSubmit = async () => {
        const formData = {
            name,
            pix,
            bank,
            accountType,
            accountNumber,
            dv,
            status,
            agency
        };
        console.log('Dados enviados:', formData);
    
        try {
            const response = await createBankAccount(formData); // Enviando dados diretamente
            console.log('Resposta do servidor:', response);
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };

    const handleHome = () => {
        navigate("/home");
    };

    const handleLogout = () => {
        context.logout();
        navigate("/");
    };

    const buttons = [
        <SideButton key="home" text="PÁGINA INICIAL" onClick={handleHome} />,
        <SideButton key="filiacao" text="CADASTROS" />,
        <SideButton key="financeiro" text="FINANCEIRO" />,
        <SideButton key="beneficios" text="BENEFÍCIOS" />,
        <h2 className="profile-status">Você está logado <br />como {user?.name}</h2>,
        <button className="btn-logout" onClick={handleLogout}> LOGOUT </button>
    ];

    return user ? (
        <section className="bank-container">
            <div>
                <SideBar className="side-menu" buttons={buttons} />
            </div>
            <div className="section">
                <h1>Cadastro de Conta Bancária</h1>
                <div className="form">
                    <FieldText label="Nome" value={name} onChange={(e) => setName(e.target.value)} />
                    <FieldSelect label="Tipo de conta" value={accountType} onChange={handleChangeAccountType} options={listAccountType} />
                    <FieldText label="Banco" value={bank} onChange={(e) => setBank(e.target.value)} />
                    <FieldText label="Agência" value={agency} onChange={(e) => setAgency(e.target.value)} />
                    <FieldText label="Número da conta" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                    <FieldText label="DV" value={dv} onChange={(e) => setDv(e.target.value)} />
                    <FieldText label="Pix" value={pix} onChange={(e) => setPix(e.target.value)} />
                    <FieldSelect label="Status" value={status} onChange={(e) => setStatus(e.target.value)} options={listStatus} />
                </div>
                <div className="Botao-submit">
                    <PrimaryButton text="Cadastrar Conta" onClick={handleSubmit} />
                </div>
            </div>
        </section>
    ) : null;
};

export default BankAccount;
