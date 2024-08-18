import { useState, useEffect } from "react";
import { useAuth } from "../../../Context/auth";
import { getUsers } from "../../../Services/userService";
import FieldSelect from "../../../Components/FieldSelect";
import "./index.css";

const Home = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [isSind, setIsSind] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        if (Array.isArray(response)) {
          setData(response);
        } else {
          console.error("Os dados recebidos não são um array.");
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  });

  return (
    user && (
      <section className="dash-section">
        <div>
          <h1>Filiados</h1>
          <div className="filiados">
            <h1>Total {Object.keys(data).length}</h1>
            <h1>
              {isSind}{" "}
              {isSind == "Sindicalizado"
                ? data.filter((item) => item.status === true).length
                : data.filter((item) => item.status === false).length}
            </h1>
          </div>
          <FieldSelect
            label="Filtro"
            onChange={(e) => {
              setIsSind(e.target.value);
            }}
            options={["Sindicalizado", "Não Sindicalizado"]}
            value={isSind}
          />
        </div>

        <div>
          <h1>Divisão de sexo por lotação</h1>
        </div>

        <div>
          <h1>Filiações e Desfiliações</h1>
        </div>

        <div>
          <h1>Filiações e Desfiliações</h1>
        </div>
      </section>
    )
  );
};

export default Home;
