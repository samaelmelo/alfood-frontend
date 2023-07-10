import { useEffect, useState } from "react";
import IRestaurante from "../../../interfaces/IRestaurante";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import http from "../../../http";

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    http
      .get("/restaurantes/")
      .then((response) => setRestaurantes(response.data))
      .catch((err) => console.log(err));
  }, []);

  const excluirRestaurante = (restauranteExcluido: IRestaurante) => {
    http.delete(`/restaurantes/${restauranteExcluido.id}/`).then(() => {
      const listaRestaurante = restaurantes.filter(
        (rest) => rest.id !== restauranteExcluido.id,
      );

      setRestaurantes([...listaRestaurante]);
    });
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((rest) => (
            <TableRow key={rest.id}>
              <TableCell>{rest.nome}</TableCell>
              <TableCell>
                [<Link to={`/admin/restaurantes/${rest.id}`}>editar</Link>]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluirRestaurante(rest)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoRestaurantes;
