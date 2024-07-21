import { useState } from 'react';
import "./index.css";
import "../../../index.css";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import FieldText from "../../../Components/FieldText";
import FieldSelect from "../../../Components/FieldSelect";
import FieldNumber from '../../../Components/FieldNumber';
import Checklist from '../../../Components/Checklist';
import PrimaryButton from '../../../Components/PrimaryButton';
import { ToggleButton, Radio, RadioGroup, FormControlLabel } from '@mui/material'; 
import { createUser } from '../../../Services/userService';
export default function Caduser(){
    //Dados a serem armazenados
    const [nomeCompleto, setnomeCompleto] = useState(''); //Armazena o nome completo da pessoa cadastrada
    const [celular, setCelular] = useState(''); //Armazena o número de celular da pessoa cadastrada
    const [login, setLogin] = useState(''); //Armazena o estado de Login da pessoa cadastrada
    const [email, setEmail] = useState(''); //Armazena o email da pessoa cadastrada
    const [acessos, setAcessos] = useState([]); //Armazena os setores de acesso da pessoa cadastrada
    const [perfilSelecionado, setPerfilSelecionado] = useState(''); //armazena perfil selecionado
  
    
    //Variáveis de controle e display da página
    const buttons = [
        <SideButton key="home" text="Pagina Inicial" />,
        <SideButton key="cadastros" text="Cadastros" />,
    ];

    const login_options = ['Ativo', 'Inativo'];
    const handleChangeLogin = (event) => {
        setLogin(event.target.value);
    };

    const setoresAcesso = ['Convênio', 'Cadastro', 'Financeiro', 'Juridico'];
    const [checklistVisible, setChecklistVisible] = useState(false);
    const toggleChecklistVisibility = () => {
        setChecklistVisible(!checklistVisible);
    };

    const perfis = ['Administrativo', 'Diretoria', 'Jurídico', 'Colaborador'];
    const handlePerfilChange = (event) => {
        setPerfilSelecionado(event.target.value);
    };

    const handleSubmit = async () => {
        const userData = {
            name: nomeCompleto,
            email: email,
            phone: celular,
            status: login === 'Ativo', // Convertendo status de login para boolean
            role: perfilSelecionado, // Assumindo que perfilSelecionado é o ID da role
            accessSectors: acessos, // Incluindo os setores de acesso
        
        };
    try{
        const response = await createUser(userData);
        console.log('Usuário criado com sucesso:', response);
        // Lógica adicional após a criação do usuário
    } catch (error) {
        console.error('Erro ao criar usuário', error);
    }
    };    
//Configuração da página
    return (
        <section className="container">
            <div className="bar-container">
                <SideBar buttons={buttons} />
            </div>

            <div className='forms-container'>
                <h1>Cadastro de usuário</h1>

                <h3>Dados Pessoais</h3>
                <FieldText
                    label="Nome Completo"
                    value={nomeCompleto}
                    onChange={(e) => setnomeCompleto(e.target.value)}
                />

                <div className='double-box'>
                    <FieldNumber
                        label="Celular"
                        value={celular}
                        onChange={(e) => setCelular(e.target.value)}
                        format='+55 (##) 9#### ####'
                    />

                    <FieldSelect
                        label="Login"
                        value={login}
                        onChange={handleChangeLogin}
                        options={login_options}
                    />
                </div>

                <FieldText
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <div className='ToggleButton'>
                    <ToggleButton variant="Setores de Acesso" onClick={toggleChecklistVisibility}>
                    Setores de Acesso
                    </ToggleButton>
                </div>
                
                {checklistVisible && (
                    <div className='teste'>
                        <Checklist
                            items={setoresAcesso}
                            value={acessos}
                            onChange={setAcessos}
                        />
                    </div>
                )}

                <h3>Perfil</h3>

                <RadioGroup value={perfilSelecionado} onChange={handlePerfilChange}>
                    {perfis.map((perfil) => (
                        <FormControlLabel
                            key={perfil}
                            value={perfil}
                            control={<Radio />}
                            label={perfil}
                        />
                    ))}
                </RadioGroup>

                <PrimaryButton
                    text='Cadastrar'
                    onClick={handleSubmit}
                />
            </div>
        </section>
    );
}
