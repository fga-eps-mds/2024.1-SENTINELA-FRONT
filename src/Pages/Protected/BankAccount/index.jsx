import AuthContext from "../../../Context/auth";
import { useNavigate } from "react-router-dom";
import React, { useContext ,useState} from "react";
import { AuthProvider, useAuth } from "../../../Context/auth";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import PrimaryButton from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import FieldSelect from "../../../Components/FieldSelect";
import FieldText from "../../../Components/FieldText";
import "./index.css";

const BankAccount = () => {
    const [nome, setNome] = useState('');

    
    const context = useContext(AuthContext);
    const { user } = useAuth();
    const navigate = useNavigate();
    const [nomeCompleto, setNomeCompleto] = useState("");
    const [pix, setPix] = useState("");
    const [banco, setBanco] = useState("");
    const [tipoDeConta, setTipoDeConta] = useState("");
    const [numeroDaConta, setNumeroDaConta] = useState("");
    const [dv, setDv] = useState("");
    const [status, setStatus] = useState("");
    const [agencia, setAgencia] = useState("");
    const listTipoDeConta = ['Conta Corrente', 'Poupança', 'Investimento', 'Caixa'];

    const handleChangeTipoDeConta = (e) => {    
        setTipoDeConta(e.target.value);
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
        <h2 className="profile-status">Você está logado <br />como {nome}</h2>,
        <button className="btn-logout" onClick={handleLogout}> LOGOUT </button>
      ];
    return user && (
        <section className="bank-container">
            <div>
            <SideBar className="side-menu" buttons={buttons} />
            </div>


        
            <div className="section">
                <h1>Cadastro de Conta Bancária</h1>
                <div className="form">
                    <FieldText label="Nome"  value= {nomeCompleto} onChange={(e) => setNomeCompleto(e.target.value)}/>
                    <FieldSelect label="Tipo de conta" value= {tipoDeConta} onChange={handleChangeTipoDeConta} options = {listTipoDeConta}/> 
                    <FieldText label="Banco" value= {banco} onChange={(e) => setBanco(e.target.value)}/>
                    <FieldText label="Agência" value= {agencia} onChange={(e) => setAgencia(e.target.value)}/>                   
                    <FieldText label="Número da conta" value= {numeroDaConta} onChange={(e) => setNumeroDaConta(e.target.value)}/>
                    <FieldText label="Dv" value= {dv} onChange={(e) => setDv(e.target.value)}/>
                    <FieldText label="Pix" value= {pix} onChange={(e) => setPix(e.target.value)}/>
                    <FieldSelect label="Status" value= {status} onChange={(e) => setStatus(e.target.value)} options = {['Ativo', 'Inativo']}/>
                </div>

                <div className="Botao-submit">
                    <PrimaryButton 
                        text="Remover Dependente"
                        onClick="#"
                    />
                </div>
                

                
            </div>

        
    </section>

);
};
export default BankAccount;