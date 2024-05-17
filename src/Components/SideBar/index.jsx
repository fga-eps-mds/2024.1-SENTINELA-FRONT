import ButtonGroup from "@mui/material/ButtonGroup";
import "./index.css";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function SideBar({ buttons }) {
  const theme = createTheme({
    palette: {
      custom: {
        main: "#341F14", // Cor principal personalizada
        contrastText: "#341F14", // Cor de contraste personalizada
      },
    },
    typography: {
      fontFamily: '"Noto Sans", "Overpass", sans-serif', // Definindo a fonte padrão
    },
  });
  
  return (
    <div className="side-bar">
      <img
        className="logo"
        src="src/assets/sindpol-logo.png"
        alt="Sindpol Logo"
      />
      <img
        className="sentinela"
        src="src/assets/sentinela-logo.png"
        alt="Sentinela Logo"
      />
      <div className="menu-lateral">
        <ThemeProvider theme={theme}>
          <ButtonGroup
            orientation="vertical"
            aria-label="Vertical button group"
            variant="text"
            sx={{
              width: "380px",
              "& .MuiButton-root": {
                color: "#3D160D", // Cor do texto dos botões
                borderColor: "#3D160D", // Cor da borda dos botões
              },
            }}
          >
            {buttons}
          </ButtonGroup>
        </ThemeProvider>
      </div>
    </div>
  );
}

SideBar.propTypes = {
  buttons: PropTypes.array.isRequired,
};
