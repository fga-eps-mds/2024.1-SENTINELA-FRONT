import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import PrimaryButton from "../../../Components/PrimaryButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import SecondaryButton from "../../../Components/SecondaryButton";
import FieldText from "../../../Components/FieldText";
import { APIBank } from "../../../Services/BaseService";

export default function ListSupplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const storagedUser = localStorage.getItem("@App:user");

  useEffect(() => {
    const fetchSupplierForm = async () => {
      try {
        const response = await APIBank.get(`/SupplierForm`, {
          headers: {
            Authorization: `Bearer ${storagedUser.token}`,
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
  });

  const handleSubmit = () => {
    navigate("/fornecedores/criar");
  };

  const handleItemClick = (supplier) => {
    navigate("/fornecedores/${supplier.nome}", {
      state: { supplierId: supplier._id },
    });
  };

  const filteredSuppliers = suppliers.filter((supplier) =>
    supplier.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="container">
      <div className="forms-container">
        <div className="double-box">
          <h1>Lista de fornecedores</h1>
          <PrimaryButton text="Cadastrar fornecedor" onClick={handleSubmit} />
        </div>

        <div className="search-box">
          <FieldText
            label="Pesquisar fornecedor"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SecondaryButton
            text="Pesquisar"
            onClick={() => filteredSuppliers(search)}
          />
        </div>

        <List>
          {filteredSuppliers.map((supplier, index) => (
            <div key={supplier._id}>
              <ListItem>
                <ListItemButton
                  className="list-item"
                  style={{
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      "rgba(0, 0, 0, 0.1)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                  onClick={() => handleItemClick(supplier)}
                >
                  <ListItemText primary={supplier.nome} />
                </ListItemButton>
              </ListItem>

              {index < filteredSuppliers.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </div>
    </section>
  );
}
