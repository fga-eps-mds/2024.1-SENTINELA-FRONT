import SideBar from "../Components/SideBar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function Login() {
  const theme = createTheme({
    palette: {
      custom: {
        button: "#AE883C", // Cor para o texto e stroke do botão
        content: "#EAE3D7", // Cor para o conteúdo interno do botão
        main: "#341F14", // Cor principal personalizada
        contrastText: "#341F14", // Cor de contraste personalizada
      },
    },
    typography: {
      fontFamily: '"Noto Sans", "Overpass", sans-serif', // Definindo a fonte padrão
    },
  });

  const rgbaValue01 = `rgba(${parseInt(
    theme.palette.custom.button.slice(-6, -4),
    16
  )}, ${parseInt(theme.palette.custom.button.slice(-4, -2), 16)}, ${parseInt(
    theme.palette.custom.button.slice(-2),
    16
  )}, 0.1)`;

  const rgbaValue09 = `rgba(${parseInt(
    theme.palette.custom.button.slice(-6, -4),
    16
  )}, ${parseInt(theme.palette.custom.button.slice(-4, -2), 16)}, ${parseInt(
    theme.palette.custom.button.slice(-2),
    16
  )}, 0.9)`;

  const buttons = [
    <Button
      key="login"
      sx={{
        "&amp;:hover": {
          backgroundColor: rgbaValue01,
        },
      }}
    >
      Login
    </Button>,
    <Button
      key="filiacao"
      sx={{
        "&amp;:hover": {
          backgroundColor: rgbaValue01,
        },
      }}
    >
      Filiação
    </Button>,
    <Button
      key="sobre"
      sx={{
        "&amp;:hover": {
          backgroundColor: rgbaValue01,
        },
      }}
    >
      Sobre
    </Button>,
  ];

  return (
    <div className="screen">
      <SideBar buttons={buttons} />
      <div className="area-card">
        <div className="card">
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
          <ThemeProvider theme={theme}>
            <TextField
              id="standard-basic"
              label="MATRÍCULA"
              variant="standard"
              focused
              placeholder="Digite sua matrícula"
              sx={{
                width: "400px",
                "&amp; .MuiInput-underline:before": {
                  borderBottomColor: theme.palette.custom.main, // Cor da borda inferior antes do foco
                },
                "&amp; .MuiInput-underline:hover:before": {
                  borderBottomColor: theme.palette.custom.main, // Cor da borda inferior ao passar o mouse
                },
                "&amp; .MuiInput-underline:after": {
                  borderBottomColor: theme.palette.custom.main, // Cor da borda inferior após o foco
                },
                "&amp; .MuiInputBase-input": {
                  color: theme.palette.custom.contrastText, // Cor do texto
                },
                "&amp; .MuiInputLabel-root": {
                  color: theme.palette.custom.main,
                  fontFamily: '"Noto Sans", sans-serif',
                },
                "&amp; .MuiInputLabel-root.Mui-focused": {
                  color: theme.palette.custom.main, // Cor do rótulo quando focado
                },
                "&amp; .MuiInputBase-input::placeholder": {
                  fontFamily: '"Overpass", sans-serif', // Fonte do placeholder
                },
              }}
            />
            <TextField
              id="standard-basic"
              label="SENHA"
              variant="standard"
              focused
              placeholder="Digite sua senha"
              sx={{
                width: "400px",
                fontfamily: "Noto Sans",
                marginTop: "33px",
                "&amp; .MuiInput-underline:before": {
                  borderBottomColor: theme.palette.custom.main, // Cor da borda inferior antes do foco
                },
                "&amp; .MuiInput-underline:hover:before": {
                  borderBottomColor: theme.palette.custom.main, // Cor da borda inferior ao passar o mouse
                },
                "&amp; .MuiInput-underline:after": {
                  borderBottomColor: theme.palette.custom.main, // Cor da borda inferior após o foco
                },
                "&amp; .MuiInputBase-input": {
                  color: theme.palette.custom.contrastText, // Cor do texto
                },
                "&amp; .MuiInputLabel-root": {
                  color: theme.palette.custom.main,
                  fontFamily: '"Noto Sans", sans-serif',
                },
                "&amp; .MuiInputLabel-root.Mui-focused": {
                  color: theme.palette.custom.main, // Cor do rótulo quando focado
                },
                "&amp; .MuiInputBase-input::placeholder": {
                  fontFamily: '"Overpass", sans-serif', // Fonte do placeholder
                },
              }}
            />
            <div className="recupera-senha">
              <Button
                key="senha"
                variant="text"
                sx={{
                  textTransform: "none",
                  textDecoration: "underline",

                  color: theme.palette.custom.main, // Cor do texto do botão
                  "&amp;:hover": {
                    transform: "scale(1.03)",
                    backgroundColor: rgbaValue01,
                  },
                }}
              >
                Esqueci a senha
              </Button>
            </div>
            <Button
              variant="contained"
              sx={{
                fontFamily: "Noto Sans, sans-serif", // Definindo a fonte para Noto Sans Display Medium
                color: theme.palette.custom.button, // Cor do texto do botão
                backgroundColor: "transparent", // Fundo transparente
                border: `2px solid ${theme.palette.custom.button}`, // Cor do stroke em torno do botão
                width: "400px", // Largura do botão
                marginTop: "50px",
                "&amp;:hover": {
                  transform: "scale(1.03)",
                  backgroundColor: rgbaValue01,
                },
              }}
            >
              Filiar-me ao sindicato
            </Button>

            <Button
              variant="contained"
              sx={{
                fontFamily: "Noto Sans, sans-serif", // Definindo a fonte para Noto Sans Display Medium
                color: theme.palette.custom.content, // Cor do texto do botão
                backgroundColor: theme.palette.custom.button, // Fundo transparente
                width: "400px", // Largura do botão
                marginTop: "15px",
                "&amp;:hover": {
                  transform: "scale(1.03)",
                  backgroundColor: rgbaValue09,
                },
              }}
            >
              Entrar
            </Button>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
