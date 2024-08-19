import { useState, useEffect } from "react";
import { useAuth } from "../../../Context/auth";
import { getUsers } from "../../../Services/userService";
import FieldSelect from "../../../Components/FieldSelect";
import "./index.css";

const Home = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [isSind, setIsSind] = useState("");

  //filter options
  const filiadosOptions = ["Sindicalizado", "Não Sindicalizado"];

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
        <div className="filiados-section">
          <h1>Filiados</h1>

          <div className="filiados">
            <div className="filiados-box">
              <h1>Total</h1>
              <h1>{Object.keys(data).length}</h1>
            </div>

            <div className="filiados-box">
              <h1>{isSind}</h1>
              <h1>
                {isSind == "Sindicalizado"
                  ? data.filter((item) => item.status === true).length
                  : data.filter((item) => item.status === false).length}
              </h1>
            </div>
          </div>
          <FieldSelect
            label="Filtro"
            onChange={(e) => {
              setIsSind(e.target.value);
            }}
            options={filiadosOptions}
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
