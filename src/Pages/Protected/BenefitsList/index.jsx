import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import FieldText from "../../../Components/FieldText";


export default function ListSupplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const storagedUser = localStorage.getItem("@App:user");


  const handleSubmit = () => {
    navigate("/beneficios/criar");
  };


  return (
    <section className="container">
      <div className="forms-container">
        <div className="double-box">
          <h1>Lista de convenios</h1>
          <PrimaryButton text="Cadastrar convenio" onClick={handleSubmit} />
        </div>

        <div className="search-box">
          <FieldText
            label="Pesquisar convenios"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <SecondaryButton
            text="Pesquisar"
            onClick={""}
          />
        </div>

        
      </div>
    </section>
  );
}