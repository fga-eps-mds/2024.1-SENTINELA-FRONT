import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AuthContext from "../../../Context/auth";
import { useAuth } from "../../../Context/auth";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import PrimaryButton from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import FieldSelect from "../../../Components/FieldSelect";
import FieldText from "../../../Components/FieldText";
import "./index.css";
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert';
import { createBankAccount } from "../../../Services/bankAccountService";
import { getBankAccount } from "../../../Services/bankAccountService";


const BankAccountId = () => {
    const [name, setName] = useState("");
    const [pix, setPix] = useState("");
    const [bank, setBank] = useState("");
    const [accountType, setAccountType] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [dv, setDv] = useState("");
    const [status, setStatus] = useState("");
    const [agency, setAgency] = useState("");
    const [openError, setOpenError] = useState(false);
    const [dataMap, setDataMap] = useState("");
    
    const context = useContext(AuthContext);
    const { user } = useAuth();
    const { id } = useParams();  // Pega o ID da URL
    const navigate = useNavigate();

    const listAccountType = ['Conta Corrente', 'Poupança', 'Investimento', 'Caixa'];
    const listStatus = ['Ativo', 'Inativo'];
    const [bankAccountType, setBankAccountType] = useState('')
    const [bankStatus, setBankStatus] = useState('')

    const handleChangeAccountType = (e) => {
        setAccountType(e.target.value);
    };

    const handleCheck = () => {
        if(!name || !accountType || !bank || !status) {
            setOpenError(true)
        } 
        
        else {
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

            handleSubmit(formData)
        }
    }

    const handleSubmit = async (formData) => {
        //const formData = {
        //    name,
        //    pix,
        //    bank,
        //    accountType,
        //    accountNumber,
        //    dv,
        //    status,
        //    agency
        //};

        console.log('Dados enviados:', formData);
    
        try {
            const response = await createBankAccount(formData); // Enviando dados diretamente
            console.log('Resposta do servidor:', response);
            navigate('/finance/')
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

    //mascaras
    const agencia = (value) => {
        // Remove qualquer caractere que não seja um dígito e limita a 5 caracteres
        return value.replace(/\D/g, '').slice(0, 5);
    };

    const numeroConta = (value) => {
        // Remove qualquer caractere que não seja um dígito e limita a 11 caracteres
        return value.replace(/\D/g, '').slice(0, 11);
    };

    const digitverificator = (value) => {
        // Remove qualquer caractere que não seja um dígito e limita a 5 caracteres
        return value.replace(/\D/g, '').slice(0, 1);
      };

    const buttons = [
        <SideButton key="home" text="PÁGINA INICIAL" onClick={() => navigate("/home/")} />,
        <SideButton key="filiacao" text="CADASTROS" />,
        <SideButton key="financeiro" text="FINANCEIRO" onClick={() => navigate("/finance/")}/>,
        <SideButton key="beneficios" text="BENEFÍCIOS" />,
    ];

    useEffect(() => {
        const fetchData = async () => {
          try {
            const result = await getBankAccount(id);
            console.log(result);
            setDataMap(result);
            setBankAccountType(result.accountType);
            setBankStatus(result.status)
          } catch (error) {
            console.error("Erro ao buscar dados:", error);
          }
        };
    
        if (id) {
          fetchData();
        }
      }, [id]);



    return user ? (
        <section className="bank-container">
            <div>
                <SideBar className="side-menu" buttons={buttons} />
            </div>
            <div className="section">
                <h1>Visualização de Conta Bancária</h1>
                <div className="form">
                    <FieldText label="Nome *" value={name ? name : dataMap.name} onChange={(e) => setName(e.target.value)} />
                    <FieldSelect  label="Tipo de conta*" value={accountType? accountType : bankAccountType} onChange={handleChangeAccountType}  options={listAccountType}/>
                    <FieldText label="Banco *" value={bank ? bank : dataMap.bank} onChange={(e) => setBank(e.target.value)} />
                    <FieldText label="Agência" value={dataMap.agency} onChange={(e) => setAgency(agencia(e.target.value))} />
                    <FieldText label="Número da conta" value={dataMap.accountNumber} onChange={(e) => setAccountNumber(numeroConta(e.target.value))} />
                    <FieldText label="DV" value={dataMap.dv} onChange={(e) => setDv(digitverificator(e.target.value))} />
                    <FieldText label="Pix" value={dataMap.pix} onChange={(e) => setPix(e.target.value)} />
                    <FieldSelect  label="Status *" value={status? status: bankStatus} onChange={(e) => setStatus(e.target.value)}  options={listStatus}/>
                </div>
                <div className="edit-buttons">
                    <SecondaryButton text="Deletar" onClick={"#"} />
                    <PrimaryButton text="Salvar" onClick={"#"} />
                </div>
            </div>

            <Snackbar
                open={openError}
                autoHideDuration={6000}
                onClose={() => setOpenError(false)}
            >
                <Alert onClose={() => setOpenError(false)} severity="error">
                    Certifique-se de que todos os campos obrigatórios estão preenchidos
                </Alert>
            </Snackbar>
            
        </section>
    ) : null;
};

export default BankAccountId;
