import React, { useContext } from "react";
import { AuthProvider, useAuth } from "../../../Context/auth";
import AuthContext from "../../../Context/auth";
import { useNavigate } from "react-router-dom";

const BankAccount = () => {
    const context = useContext(AuthContext);
    const navigate = useNavigate();
    const { user } = useAuth();

    
    return user && (
        <div>
        <h1>Bank Account</h1>
        <div>
            Bem vindo {user.nomeCompleto}
        </div>

    
    </div>
);
};
export default BankAccount;