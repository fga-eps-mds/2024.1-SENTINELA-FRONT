import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    button: "#AE883C", // Cor para o texto e stroke do botão
    content: "#EAE3D7", // Cor para o conteúdo interno do botão
    main: "#341F14", // Cor principal
    contrastText: "#3D160D", // Cor de texto
  },
  typography: {
    fontFamilyPrimary: '"Noto Sans", sans-serif',
    fontFamilySecondary: '"Overpass", sans-serif',
  },
});

export default theme;
