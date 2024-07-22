import SideBar from "../../../Components/SideBar";
import "./index.css";
import React, { useEffect, useState, useContext} from "react";
import SideButton from "../../../Components/SideButton";
import FieldText from "../../../Components/FieldText";
import FieldNumber from "../../../Components/FieldNumber";
import { useAuth } from "../../../Context/auth";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../Context/auth";
import { APIUsers } from "../../../Services/BaseService";
import PrimaryButton from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";



const ProfileUpdate = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate(); 
  
  
  const { user } = useAuth();
  const storagedUserString = localStorage.getItem('@App:user'); // Usuario logado
  let storagedUser = {};
  storagedUser = JSON.parse(storagedUserString); // Usuario logado => JSON
  
  const getUser = async () => { // Busca usuario no banco
    try {
      const response = await APIUsers.get(`users/${storagedUser.user._id}`,
        {
          headers: {
            'Authorization': `Bearer ${storagedUser.token}`
          }
        }
      );
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
      navigate("/")
    };

    const handleSubmit = async (e) => {
      await APIUsers.patch(`users/patch/${storagedUser.user._id}`, 
        {
          phone: celular
        },
        {
          headers: {
            'Authorization': `Bearer ${storagedUser.token}`
          }
        }
      );
      setCelular(celular);
    };

    const handleCancel = () => {
      navigate("/home")
    };
    
    const [nome, setNome] = useState('');
    const [celular, setCelular] = useState('');
    const [login, setLogin] = useState('');
    const [email, setEmail] = useState('');
    //setores de acesso

    
    useEffect(() => {
      getUser();
    }, [])
  
    const buttons = [
      <SideButton key="login" text="Pagina Inicial" />,
      <SideButton key="filiacao" text="Cadastro" />, 
      <h2 className="profile-status" >Voce está logado <br />como {nome} </h2>,
      <button className="btn-logout" text="Entrar" onClick={handleLogout}  > SAIR </button>
      
    ];

    return user && (
      <section className="container">    
            <SideBar className='side-menu' buttons={buttons} />
            <div className='campos-container'>
              <h3 className="profile-view"> Visualização de usuário </h3>
              <h4 className="personal-data"> Dados pessoais </h4>        
              <div className='section-campo'>
                <FieldText 
                  label="Nome*"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  disabled={true}
                />
              </div>
              <div className='double-box'>
                <FieldNumber 
                  label="Celular"
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                  format="(##) #####-####"
                />
                <FieldText 
                  label="Login*"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  disabled={true}
                />
              </div>
              <div className='section-campo'>
                <FieldText 
                  label="E-mail*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={true}
                />
              </div>
              <div className='section-sector'>
                <FieldText 
                  label="Setores de acesso*"
                  value={""}
                  disabled={true}
                />
              </div>
              <div className='section-doublebtn'>
                    
                <SecondaryButton
                  text='Cancelar'
                  onClick={handleCancel}
                />

                <PrimaryButton
                  text='Salvar'
                  onClick={handleSubmit}
                />
              </div>
            </div>
        </section>
      );
};

export default ProfileUpdate;
