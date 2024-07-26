import { createTheme } from "@mui/material/styles";

 const theme = createTheme({
  palette: {
    custom: {
      button: "#AE883C", // Cor para o texto e stroke do botão
      content: "#EAE3D7", // Cor para o conteúdo interno do botão
      main: "#341F14", // Cor principal
      contrastText: "#341F14", // Cor de contraste
    },
  },
  typography: {
    fontFamily: '"Noto Sans", "Overpass", sans-serif',
  },
});

export default theme; 