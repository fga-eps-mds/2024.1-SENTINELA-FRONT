import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../../Context/auth";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../Context/auth";
import PrimaryButton from "../../../Components/PrimaryButton";
import "./index.css";
import { listBankAccount, getAll } from "../../../Services/bankAccountService";
import FieldText from "../../../Components/FieldText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

export default function ListBankAccount() {
    const [busca, setBusca] = useState('');
    const [dataMap, setDataMap] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [messageAlert, setMessageAlert] = useState('');
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleHome = () => {
        navigate("/home");
    };

    const fetchAllAccounts = async () => {
        try {
            const result = await getAll();
            if (result.message) {
                setMessageAlert(result.message);
                setOpenModal(true);
                return;
            }
            setDataMap(result);
            setFilteredData(result); // Initialize filtered data with all accounts
        } catch (error) {
            alert("Ocorreu um erro ao buscar as contas.");
        }
    };

    useEffect(() => {
        fetchAllAccounts(); // Fetch all accounts when the component mounts
    }, []);

    useEffect(() => {
        // Filter accounts based on search input
        if (busca) {
            const filtered = dataMap.filter(account =>
                account.name.toLowerCase().includes(busca.toLowerCase())
            );
            setFilteredData(filtered);
        } else {
            setFilteredData(dataMap); // Show all accounts if search input is empty
        }
    }, [busca, dataMap]);

    const handleNavigateWithId = (id) => {
        navigate(`/finance/listBankAccount/${id}`);
    };

    return user && (
        <section className="listContainer">
            <div className="list">
                <div className="header">
                    <h1>Lista de Contas Bancárias</h1>
                    <PrimaryButton 
                        className="primary-button" 
                        text="Cadastrar contas bancárias" 
                        onClick={() => navigate("/finance/bankAccount")} 
                    />
                </div>
                <div className="search">
                    <FieldText
                        label="Pesquisar Conta"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />
                </div>
                {filteredData && filteredData.length > 0 ? (
                    <List>
                        {filteredData.map(account => (
                            <div className="result" key={account._id}>
                                <ListItem>
                                    <ListItemButton
                                        onClick={() => handleNavigateWithId(account._id)}
                                    >
                                        <ListItemText primary={account.name} />
                                    </ListItemButton>
                                </ListItem>
                            </div>
                        ))}
                    </List>
                ) : (
                    <div>Nenhuma conta encontrada</div>
                )}
            </div>

            <Snackbar
                open={openModal}
                autoHideDuration={6000}
                onClose={() => setOpenModal(false)}
            >
                <Alert onClose={() => setOpenModal(false)} severity="error">
                    {messageAlert || "Conta não encontrada!"}
                </Alert>
            </Snackbar>
        </section>
    );
}
