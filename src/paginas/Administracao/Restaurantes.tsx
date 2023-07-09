import { useEffect, useState } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v2/restaurantes/")
      .then((response) => setRestaurantes(response.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Editar</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map((rest) => (
            <TableRow key={rest.id}>
              <TableCell>{rest.nome}</TableCell>
              <TableCell>
                [<Link to={`/admin/restaurantes/${rest.id}`}>editar</Link>]
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdministracaoRestaurantes;
