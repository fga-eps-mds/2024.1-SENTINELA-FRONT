import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import React, { useState } from "react";
import PropTypes from "prop-types";
import "./index.css";
import BigModal from "../BigModal";
import { Grid, Typography } from "@mui/material";

export default function CheckList({ items, value, onChange }) {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState();

  console.log(user);

  const handleToggle = (e) => () => {
    const currentIndex = value.indexOf(e);
    const newChecked = [...value];

    if (currentIndex === -1) {
      newChecked.push(e);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    onChange(newChecked);
  };

  return (
    <List>
      {items.map((item) => (
        <React.Fragment key={item}>
          <ListItem className="checklist-item">
            <ListItemText
              style={{ cursor: "pointer" }}
              onClick={() => {
                setShow(true);
                setUser(item);
              }}
              primary={item.name}
            />
            <Checkbox
              edge="end"
              checked={value.indexOf(item?._id) !== -1}
              tabIndex={-1}
              onClick={handleToggle(item?._id)}
              disableRipple
              sx={{
                color: '#3D160D', // Cor para o estado desmarcado
                '&.Mui-checked': {
                  color: '#AE883C',
                },
              }}
              
              
            />
          </ListItem>
          <Divider />
        </React.Fragment>
      ))}
      <BigModal show={show} handleClose={() => setShow(false)}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Nome:</strong> {user?.name}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Email:</strong> {user?.email}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Religião:</strong> {user?.religion}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Telefone:</strong> {user?.phone}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>CPF:</strong> {user?.cpf}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Data de Nascimento:</strong>{" "}
              {new Date(user?.birthDate).toLocaleDateString("pt-BR")}{" "}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Sexo:</strong> {user?.sex}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Endereço:</strong> {user?.address}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Naturalidade:</strong> {user?.naturalness}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>UF Naturalidade:</strong> {user?.uf_naturalidade}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Estado Civil:</strong> {user?.marialStatus}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Escolaridade:</strong> {user?.education}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Lotação:</strong> {user?.lotacao}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Cargo:</strong> {user?.position}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Organização Emissora:</strong> {user?.shipperOrganization}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Data de Contratação:</strong>{" "}
              {new Date(user?.hiringDate).toLocaleDateString("pt-BR")}{" "}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1">
              <strong>Dependentes:</strong> {user?.dependents?.length || 0}
            </Typography>
          </Grid>
        </Grid>
      </BigModal>
    </List>
  );
}

CheckList.propTypes = {
  items: PropTypes.any,
  value: PropTypes.any,
  onChange: PropTypes.any,
};
