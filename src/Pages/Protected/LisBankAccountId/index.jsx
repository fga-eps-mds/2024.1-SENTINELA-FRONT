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
import { createBankAccount, getBankAccount, deleteBankAccount, updateBankAccount } from "../../../Services/bankAccountService";
import Modal from "../../../Components/Moldal" 


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

    const [openDeleteBankAccount, setOpenDeleteBankAccount] = useState(false);

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


      const handleUpdate = async () => {
        // Construir o objeto de dados atualizados dinamicamente
        const updatedData = {
            ...(name && { name }), // Inclui name se não estiver vazio
            ...(pix && { pix }), // Inclui pix se não estiver vazio
            ...(bank && { bank }), // Inclui bank se não estiver vazio
            ...(accountType && { accountType }), // Inclui accountType se não estiver vazio
            ...(accountNumber && { accountNumber }), // Inclui accountNumber se não estiver vazio
            ...(dv && { dv }), // Inclui dv se não estiver vazio
            ...(status && { status }), // Inclui status se não estiver vazio
            ...(agency && { agency }) // Inclui agency se não estiver vazio
        };
        
        console.log('Dados enviados:', updatedData);
    
        try {
            // Certificar-se de que id é uma string válida e não um objeto
            console.log('id:', id);
            const response = await updateBankAccount(id, updatedData);
            console.log('Resposta do servidor:', response);
            // Você pode redirecionar ou atualizar o estado aqui
        } catch (error) {
            console.error('Erro ao enviar dados:', error);
        }
    };
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
                    <SecondaryButton text="Deletar" onClick={() => {deleteBankAccount(id); setOpenDeleteBankAccount(true)}} />
                    <PrimaryButton text="Salvar" onClick={handleUpdate } />
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

            <Modal
                show={openDeleteBankAccount}
                width="400px"
                alertTitle="Conta bancária excluída"
                alert=""
            >
                <SecondaryButton
                    text="ok"
                    onClick={() => navigate('/finance/')}
                    style={"width: 250px; margin-top : 10px"}
                    sx={{ width: "250px", "margin-top" : "10px" }}
                />
            </Modal>
            
        </section>
    ) : null;
};

export default BankAccountId;
