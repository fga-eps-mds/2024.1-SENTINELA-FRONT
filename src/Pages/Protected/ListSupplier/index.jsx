import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import SecondaryButton from "../../../Components/SecondaryButton";
import FieldText from "../../../Components/FieldText";
import { getSupplierForm } from "../../../Services/supplierService";

export default function ListSupplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupplierForm = async () => {
      const response = await getSupplierForm();
      const data = response;
      if (Array.isArray(data)) {
        setSuppliers(data);
      }
    };

    fetchSupplierForm();
  });

  const handleItemClick = (suppliers) => {
    navigate(`/fornecedores/${suppliers.nome}`, {
      state: { supplierId: suppliers._id },
    });
  };

  const filteredSuppliers = suppliers?.filter((suppliers) =>
    suppliers.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="container">
      <div className="forms-container">
        <div className="double-box">
          <h1>Lista de fornecedores</h1>
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
          {filteredSuppliers?.map((suppliers, index) => (
            <div key={suppliers._id}>
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
                  onClick={() => handleItemClick(suppliers)}
                >
                  <ListItemText primary={suppliers.nome} />
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
