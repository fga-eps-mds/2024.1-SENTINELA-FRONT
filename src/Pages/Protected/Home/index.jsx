import { useAuth } from "../../../Context/auth";

const Home = () => {
  const { user } = useAuth();

  return (
    user && (
      <div>
        <h1>Home</h1>
        <div>Bem vindo {user.nomeCompleto}</div>
      </div>
    )
  );
};

export default Home;
