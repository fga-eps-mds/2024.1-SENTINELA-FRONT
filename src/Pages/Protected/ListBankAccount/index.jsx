import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../../Context/auth";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../../Context/auth";
import SideBar from "../../../Components/SideBar";
import SideButton from "../../../Components/SideButton";
import PrimaryButtom from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import "./index.css";
import { listBankAccount, getAll } from "../../../Services/bankAccountService";
import FieldText from "../../../Components/FieldText";
import { Snackbar } from "@mui/material";
import Alert from "@mui/material/Alert";

export default function ListBankAccount() {
    const [nome, setNome] = useState('');
    const [busca, setBusca] = useState('');
    const [dataMap, setDataMap] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const { id } = useParams();
    const [messageAlert, setMessageAlert] = useState('');
    const [openModal, setOpenModal] = useState(false);

    const context = useContext(AuthContext);
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

    const handleSearch = async () => {
        try {
            const result = await listBankAccount(busca);
            if (result.message) {
                setMessageAlert(result.message);
                setOpenModal(true);
                return;
            }
            setFilteredData(result);
        } catch (error) {
            alert("Ocorreu um erro ao realizar a pesquisa.");
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

    const buttons = [
        <SideButton key="home" text="PÁGINA INICIAL" onClick={handleHome} />,
        <SideButton key="filiacao" text="CADASTROS" />,
        <SideButton key="financeiro" text="FINANCEIRO" onClick={() => navigate("/finance/")} />,
        <SideButton key="beneficios" text="BENEFÍCIOS" />,
    ];

    return user && (
        <section className="listContainer">
            <div>
                <SideBar className="side-menu" buttons={buttons} nome={user.nome} />
            </div>

            <div className="listContainer list">
                <div className="header">
                    <h1>Lista de Contas Bancárias</h1>
                    <PrimaryButtom text="Cadastrar contas bancárias" onClick={() => navigate("/finance/bankAccount")} />
                </div>

                <div className="search">
                    <FieldText
                        label="Pesquisar Conta"
                        value={busca}
                        onChange={(e) => setBusca(e.target.value)}
                    />

                    <div>
                        <SecondaryButton
                            text="Pesquisar"
                            onClick={handleSearch}
                        />
                    </div>
                </div>
                {filteredData && filteredData.length > 0 ? (
                    <div className="result">
                        {filteredData.map(account => (
                            <FieldText
                                key={account._id}
                                label={account.name}
                                onClick={() => handleNavigateWithId(account._id)}
                            />
                        ))}
                    </div>
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
