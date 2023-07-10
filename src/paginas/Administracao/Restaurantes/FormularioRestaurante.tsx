import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";

import { Link as RouterLink } from "react-router-dom";

const FormularioRestaurant = () => {
  const [nome, setNomeRestaurant] = useState("");

  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      http
        .get(`/restaurantes/${parametros.id}/`)
        .then((response) => setNomeRestaurant(response.data.nome))
        .catch((err) => console.log(err));
    }
  }, [parametros]);

  const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (parametros.id) {
      http
        .put(`/restaurantes/${parametros.id}/`, {
          nome,
        })
        .then(() => alert("Atualizado com sucesso"))
        .catch((err) => console.log(err));
    } else {
      http
        .post("/restaurantes/", {
          nome,
        })
        .then(() => {
          alert("Cadastrado com sucesso");
        });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <Typography component="h1" variant="h6">
        Formulário de Restaurantes
      </Typography>
      <Box component="form" sx={{ width: "100%" }} onSubmit={aoSubmeterForm}>
        <TextField
          fullWidth
          label="Nome do Restaurante"
          variant="standard"
          value={nome}
          onChange={(event) => setNomeRestaurant(event.target.value)}
          required
        />
        <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioRestaurant;
