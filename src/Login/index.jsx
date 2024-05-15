import SideBar from "../Components/SideBar"
import Button from "@mui/material/Button";

export default function Login() {
  const buttons = [
    <Button key="login">Login</Button>,
    <Button key="filiacao">Filiação</Button>,
    <Button key="sobre">Sobre</Button>,
  ];
  return (
    <SideBar buttons={ buttons } />
  )
}
