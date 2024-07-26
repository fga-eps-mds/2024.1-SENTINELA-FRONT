import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./Context/auth";
import theme from "./Styles/global";
import { ThemeProvider } from "@mui/material";
import Routes from "./Routes";
import SideBar from "./Components/SideBar";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <div className="container">
            <SideBar />
            <div className="routes">
              <Routes />
            </div>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
