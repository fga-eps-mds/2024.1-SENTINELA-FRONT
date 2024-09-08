import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import PrimaryButton from "../../../../Components/PrimaryButton";
import FieldText from "../../../../Components/FieldText";
import { getSupplierForm } from "../../../../Services/supplierService";
import { checkAction, usePermissions } from "../../../../Utils/permission";

export default function ListSupplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const permissions = usePermissions();
  const canCreate = checkAction(permissions, "finance", "create");
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

  const handleSubmit = () => {
    navigate("/fornecedores/criar");
  };

  const handleItemClick = (suppliers) => {
    navigate(`/fornecedores/${suppliers.nome}`, {
      state: { supplierId: suppliers._id },
    });
  };

  const filteredSuppliers = suppliers?.filter((suppliers) =>
    suppliers.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="container-list-suppliers">
      <div className="forms-container-list-suppliers">
        <div className="double-box-list-suppliers">
          <h1> Lista de fornecedores</h1>
          {canCreate && (
            <PrimaryButton text="Cadastrar fornecedor" onClick={handleSubmit} />
          )}
        </div>
        <div className="search-box-suppliers">
          <FieldText
            label="Pesquisar fornecedor"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <List>
            {filteredSuppliers?.map((supplier, index) => (
              <div key={supplier._id}>
                <ListItem>
                  <ListItemButton
                    className="list-item-suppliers"
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
      </div>
    </section>
  );
}
