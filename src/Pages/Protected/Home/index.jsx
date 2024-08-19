import { useState, useEffect } from "react";
import { useAuth } from "../../../Context/auth";
import { getUsers } from "../../../Services/userService";
import FieldSelect from "../../../Components/FieldSelect";
import "./index.css";

const Home = () => {
  const { user } = useAuth();
  const [data, setData] = useState([]);
  const [isSind, setIsSind] = useState("");
  const [lotacao, setLotacao] = useState("");

  // filter options
  const filiadosOptions = ["Sindicalizado", "Não Sindicalizado"];

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        if (Array.isArray(response)) {
          const normalizedUsers = normalizeUserData(response);
          setData(normalizedUsers);
        } else {
          console.error("Os dados recebidos não são um array.");
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []); // Adicionei a lista de dependências vazia para evitar chamadas infinitas

  function normalizeUserData(users) {
    return users.map(user => {
      if (user.lotacao) {
        user.lotacao = user.lotacao.toLowerCase().trim();
      }
      return user;
    });
  }

  const uniqueLotacoes = (users) => {
    const lotacoesSet = new Set();
  
    users.forEach(user => {
      if (user.lotacao) {
        lotacoesSet.add(user.lotacao.toLowerCase().trim());
      }
    });
  
    return Array.from(lotacoesSet);
  };

  const lotacoesOptions = uniqueLotacoes(data); // Chame a função e armazene o resultado

  return (
    user && (
      <section className="dash-section">
        <div className="filiados-section">
          <h1>Filiados</h1>

          <div className="filiados">
            <div className="filiados-box">
              <h2>Total</h2>
              <h1 id="box">{data.length}</h1>
            </div>

            <div className="filiados-box">
              <h2>{isSind}</h2>
              <h1 id="box">
                {isSind === "Sindicalizado"
                  ? data.filter((item) => item.status === true).length
                  : data.filter((item) => item.status === false).length}
              </h1>
            </div>

            <FieldSelect
              label="Filtro"
              onChange={(e) => {
                setIsSind(e.target.value);
              }}
              options={filiadosOptions} // Aqui estava correto, só corrigindo o caso abaixo
              value={isSind}
            />
          </div>
        </div>

        <div>
          <h1>Divisão de sexo por lotação</h1>
          <div>
            DASH
          </div>

          <FieldSelect
            label="Filtro"
            onChange={(e) => {
              setLotacao(e.target.value);
            }}
            options={lotacoesOptions} // Use as lotações únicas como options
            value={lotacao}
          />
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
