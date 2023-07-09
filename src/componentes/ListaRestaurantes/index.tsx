import { useEffect, useState } from "react";
import IRestaurante from "../../interfaces/IRestaurante";
import style from "./ListaRestaurantes.module.scss";
import Restaurante from "./Restaurante";
import axios from "axios";
import { IPaginacao } from "../../interfaces/IPaginacao";

const ListaRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);
  const [proximaPagina, setProximaPagina] = useState("");

  useEffect(() => {
    axios
      .get<IPaginacao<IRestaurante>>("http://localhost:8000/api/v1/restaurantes/")
      .then((response) => {
        setRestaurantes(response.data.results);
        setProximaPagina(response.data.next);
      })
      .catch((err) => console.log(err));
  }, []);

  const verMais = () => {
    axios
      .get<IPaginacao<IRestaurante>>(proximaPagina)
      .then((response) => {
        setRestaurantes([...restaurantes, ...response.data.results]);
        setProximaPagina(response.data.next);
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurantes?.map((item) => (
        <Restaurante restaurante={item} key={item.id} />
      ))}
      {proximaPagina && <button onClick={verMais}>ver mais</button>}
    </section>
  );
};

export default ListaRestaurantes;
