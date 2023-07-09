import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FormularioRestaurant = () => {
  const [nome, setNomeRestaurant] = useState("");

  const parametros = useParams();

  useEffect(() => {
    if (parametros.id) {
      axios
        .get(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
        .then((response) => setNomeRestaurant(response.data.nome))
        .catch((err) => console.log(err));
    }
  }, [parametros]);

  const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (parametros.id) {
      axios
        .put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, {
          nome,
        })
        .then(() => alert("Atualizado com sucesso"))
        .catch((err) => console.log(err));
    } else {
      axios
        .post("http://localhost:8000/api/v2/restaurantes/", {
          nome,
        })
        .then(() => {
          alert("Cadastrado com sucesso");
        });
    }
  };

  return (
    <form onSubmit={aoSubmeterForm}>
      <TextField
        id="standard-basic"
        label="Nome do Restaurante"
        variant="standard"
        value={nome}
        onChange={(event) => setNomeRestaurant(event.target.value)}
      />
      <Button type="submit" variant="outlined">
        Salvar
      </Button>
    </form>
  );
};

export default FormularioRestaurant;
