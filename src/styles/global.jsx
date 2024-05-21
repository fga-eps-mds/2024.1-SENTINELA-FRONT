import { createTheme } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { Button, ButtonGroup } from "@mui/material";

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

const rgbaValue01 = `rgba(174, 136, 60, 0.1);`;

const rgbaValue09 = `rgba(174, 136, 60, 0.9);`;

const LabeledTextField = ({ label, placeholder }) => {
  return (
    <TextField
      label={label}
      placeholder={placeholder}
      id="standard-basic"
      variant="standard"
      focused
      sx={{
        width: "400px",
        fontFamily: "Noto Sans",
        marginTop: "33px",
        "& .MuiInput-underline:before": {
          borderBottomColor: theme.palette.custom.main, // Cor da borda inferior antes do foco
        },
        "& .MuiInput-underline:hover:before": {
          borderBottomColor: theme.palette.custom.main, // Cor da borda inferior ao passar o mouse
        },
        "& .MuiInput-underline:after": {
          borderBottomColor: theme.palette.custom.main, // Cor da borda inferior após o foco
        },
        "& .MuiInputBase-input": {
          color: theme.palette.custom.contrastText, // Cor do texto
        },
        "& .MuiInputLabel-root": {
          color: theme.palette.custom.main,
          fontFamily: '"Noto Sans", sans-serif',
        },
        "& .MuiInputLabel-root.Mui-focused": {
          color: theme.palette.custom.main, // Cor do rótulo quando focado
        },
        "& .MuiInputBase-input::placeholder": {
          fontFamily: '"Overpass", sans-serif', // Fonte do placeholder
        },
      }}
    />
  );
};

const UnderlinedTextButton = ({ text }) => {
  return (
    <Button
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
      {text}
    </Button>
  );
};

const PrimaryButton = ({ text }) => {
  return (
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
      {text}
    </Button>
  );
};

const SecondaryButton = ({ text }) => {
  return (
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
      {text}
    </Button>
  );
};

const SideButtonGroup = ({buttons}) => {
  return (
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
  );
};

const SideButton = ({ key, text }) => {
  return (
    <Button
      key={key}
      sx={{
        "&amp;:hover": {
          backgroundColor: rgbaValue01,
        },
      }}
    >
      {text}
    </Button>
  );
};

export {
  theme,
  LabeledTextField,
  UnderlinedTextButton,
  PrimaryButton,
  SecondaryButton,
  SideButtonGroup,
  SideButton,
};
