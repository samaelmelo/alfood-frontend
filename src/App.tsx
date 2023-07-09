import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import AdministracaoRestaurantes from "./paginas/Administracao/Restaurantes";
import FormularioRestaurant from "./paginas/Administracao/FormularioRestaurante";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin/restaurantes" element={<AdministracaoRestaurantes />} />
      <Route path="/admin/restaurantes/novo" element={<FormularioRestaurant />} />
      <Route path="/admin/restaurantes/:id" element={<FormularioRestaurant />} />
    </Routes>
  );
}

export default App;
