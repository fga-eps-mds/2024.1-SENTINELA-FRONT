import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index";
import SideBar from "../../../Components/SideBar";
import PrimaryButton from "../../../Components/PrimaryButton";
import LabeledTextField from "../../../Components/LabeledTextField";
import SecondaryButton from "../../../Components/SecondaryButton";
import SideButton from "../../../Components/SideButton";

export default function ListSupplier() {

    const buttons = [
        <SideButton key="home" text="Página inicial" />,
        <SideButton key="cadastros" text="Cadastros" />,
        <SideButton key="financeiro" text="Financeiro" />,
      ];

    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const handleRegisterClick = () => {
        navigate('/supplier');
    };

    return (
        <section className="container">
            <div className="bar-container">

            </div>
        </section>
    )
}