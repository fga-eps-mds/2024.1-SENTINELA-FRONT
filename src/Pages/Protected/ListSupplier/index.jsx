import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import SideBar from "../../../Components/SideBar";
import PrimaryButton from "../../../Components/PrimaryButton";
import LabeledTextField from "../../../Components/LabeledTextField";
import SideButton from "../../../Components/SideButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
//import { getSupplierForm } from "../../../Services/supplierService";
import ListItemText from "@mui/material/ListItemText";
import SecondaryButton from "../../../Components/SecondaryButton";
import FieldText from "../../../Components/FieldText";
//import { APISuppliers, APIUsers } from "../../../Services/BaseService";

export default function ListSupplier() {
  const buttons = [
    <SideButton key="home" text="Página inicial" />,
    <SideButton key="cadastros" text="Cadastros" />,
    <SideButton key="financeiro" text="Financeiro" />,
  ];

  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  /* useEffect(() => {
    const fetchSupplierForm = async () => {
      try {
        const storagedSupplierString = localStorage.getItem("@App:supplier");
        const storagedSupplier = JSON.parse(storagedSupplierString);

        const response = await APISuppliers.get("suppliers", {
          headers: {
            Authorization: 'Bearer ${storagedSupplier.token}',
          },
        });

        const data = response.data;
        if (Array.isArray(data)) {
          setSuppliers(data);
        } else {
          console.error("Os dados recebidos não são um array.");
        }
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
      }
    };

    fetchSupplierForm();
  }, []);*/

  const handleRegisterClick = () => {
    navigate("/supplier");
  };

  const handleItemClick = (supplier) => {
    navigate("/viewsupplier", { state: { supplier } });
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="container">
        <SideBar className="side-menu" buttons={buttons} />

      <div className="forms-container">

        <div className="double-box">
        <h1>Lista de fornecedores</h1>
        <PrimaryButton
          text="Cadastrar fornecedor"
          onClick={() => handleRegisterClick}
        />
        </div>
        
        <div className="search-box">
          
          <FieldText
            label="Pesquisar fornecedor"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SecondaryButton
            text="Pesquisar"
            onClick={() => handleRegisterClick}
          />
        </div>

        <List>
          {filteredSuppliers.map((supplier, index) => (
            <div key={supplier._id}>
              <ListItem>
                <ListItemButton
                  className="list-item"
                  button
                  onClick={() => handleItemClick(supplier)}
                >
                  <ListItemText primary={supplier.name} />
                </ListItemButton>
              </ListItem>

              {index < filteredSuppliers.lenght - 1 && <Divider />}
            </div>
          ))}
        </List>
      </div>
    </section>
  );
}
