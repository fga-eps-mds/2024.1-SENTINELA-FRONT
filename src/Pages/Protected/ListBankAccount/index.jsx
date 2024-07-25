import React, { useContext } from "react";
import AuthContext from "../../../Context/auth";
import { useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../../../Context/auth";

export default function ListBankAccount() {


   const context = useContext(AuthContext);
    const navigate = useNavigate();
    const { user } = useAuth();

    
    return user && (
        <div>
        <h1>Pag listagem</h1>
        <div>
            Bem vindo {user.nomeCompleto}
        </div>

    
    </div>
);
};

