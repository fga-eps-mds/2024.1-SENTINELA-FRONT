import React, { useContext } from "react";
import { useAuth } from '../../contexts/auth';

const Home = () => {
    const context = useContext(useAuth)
  
    console.log(userInfo)

    return (
      <div>
        <h1>Home</h1>
        <div>
            Bem vindo {context.user.nomeCompleto}
        </div>
      </div>
    );
  };

export default Home