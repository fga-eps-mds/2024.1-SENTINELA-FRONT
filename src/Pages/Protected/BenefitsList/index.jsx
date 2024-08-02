import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../../../Components/PrimaryButton";
import SecondaryButton from "../../../Components/SecondaryButton";
import FieldText from "../../../Components/FieldText";
import { APIBenefits } from "../../../Services/BaseService";

export default function ListSupplier() {
  //const [suppliers, setSuppliers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate("/beneficios/criar");
  };

  useEffect(() => {
    const getBenefits = async () => {
      try {
        const response = await APIBenefits.get(`benefits`);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getBenefits();
  }, []);

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
          <SecondaryButton text="Pesquisar" onClick={""} />
        </div>
      </div>
    </section>
  );
}
