export const getToken = () => {
  const storagedToken = localStorage.getItem("@App:token");
  if (storagedToken) {
    try {
      const token = JSON.parse(storagedToken);
      return token;
    } catch (error) {
      console.error("O token armazenado não é um JSON válido:", error);
    }
  }
};
export const getUser = () => {
  const storagedUser = localStorage.getItem("@App:user");

  if (storagedUser) {
    try {
      const user = JSON.parse(storagedUser);
      return user;
    } catch (error) {
      console.error("O token armazenado não é um JSON válido:", error);
    }
  }
};
