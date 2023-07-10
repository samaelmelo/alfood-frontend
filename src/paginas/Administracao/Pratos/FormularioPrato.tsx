import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../http";

import ITag from "../../../interfaces/ITag";
import IRestaurante from "../../../interfaces/IRestaurante";
import { useParams } from "react-router-dom";
import IPrato from "../../../interfaces/IPrato";

const FormularioPrato = () => {
  const [prato, setNomePrato] = useState("");
  const [descricao, setDescricao] = useState("");
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<ITag[]>([]);
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [restaurante, setRestaurante] = useState("");
  const [imagem, setImagem] = useState<File | null | string>(null);

  const parametros = useParams();

  useEffect(() => {
    http
      .get<{ tags: ITag[] }>("/tags/")
      .then((response) => setTags(response.data.tags))
      .catch((err) => console.log(err));

    http
      .get<IRestaurante[]>("restaurantes/")
      .then((response) => setRestaurantes(response.data))
      .catch((err) => console.log(err));

    if (parametros.id) {
      http.get<IPrato>(`pratos/${parametros.id}/`).then((response) => {
        setNomePrato(response.data.nome);
        setDescricao(response.data.descricao);
        setTag(response.data.tag);
        setImagem(response.data.imagem);
      });
    }
  }, [parametros]);

  const selecionarArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setImagem(event.target.files[0]);
    } else {
      setImagem(null);
    }
  };

  const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("nome", prato);
    formData.append("descricao", descricao);
    formData.append("tag", tag);
    formData.append("restaurante", restaurante);

    if (imagem) {
      formData.append("imagem", imagem);
    }

    http
      .request({
        url: "pratos/",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
      .then(() => {
        alert("Prato cadastrado com sucesso");
        setNomePrato("");
        setDescricao("");
        setRestaurante("");
        setTag("");
      })
      .catch((err) => console.log(err));
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
          label="Nome do prato"
          variant="standard"
          value={prato}
          onChange={(event) => setNomePrato(event.target.value)}
          required
          margin="dense"
        />
        <TextField
          fullWidth
          label="Descrição do prato"
          variant="standard"
          value={descricao}
          onChange={(event) => setDescricao(event.target.value)}
          required
          margin="dense"
        />

        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select
            labelId="select-tag"
            value={tag}
            onChange={(event) => setTag(event.target.value)}
          >
            {tags.map((tag) => (
              <MenuItem value={tag.value} key={tag.id}>
                {tag.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl margin="dense" fullWidth>
          <InputLabel id="select-restaurante">Restaurante</InputLabel>
          <Select
            labelId="select-restaurante"
            value={restaurante}
            onChange={(event) => setRestaurante(event.target.value)}
          >
            {restaurantes.map((restaurante) => (
              <MenuItem value={restaurante.nome} key={restaurante.id}>
                {restaurante.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <input type="file" onChange={selecionarArquivo} />
        {/* <TextField
          fullWidth
          label="Nome do prato"
          variant="standard"
          value={prato}
          onChange={(event) => setNomePrato(event.target.value)}
          required
        /> */}
        <Button sx={{ marginTop: 1 }} type="submit" fullWidth variant="outlined">
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default FormularioPrato;
