import { Routes, Route } from "react-router-dom";
import Home from "./paginas/Home";
import VitrineRestaurantes from "./paginas/VitrineRestaurantes";
import AdministracaoRestaurantes from "./paginas/Administracao/Restaurantes/Restaurantes";
import FormularioRestaurant from "./paginas/Administracao/Restaurantes/FormularioRestaurante";
import PaginaBaseAdmin from "./paginas/Administracao/PaginaBaseAdmin";
import AdministracaoPratos from "./paginas/Administracao/Pratos/AdministracaoPratos";
import FormularioPrato from "./paginas/Administracao/Pratos/FormularioPrato";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurantes" element={<VitrineRestaurantes />} />
      <Route path="/admin" element={<PaginaBaseAdmin />}>
        <Route path="restaurantes" element={<AdministracaoRestaurantes />} />
        <Route path="restaurantes/novo" element={<FormularioRestaurant />} />
        <Route path="restaurantes/:id" element={<FormularioRestaurant />} />
        <Route path="pratos" element={<AdministracaoPratos />} />
        <Route path="pratos/:id" element={<FormularioPrato />} />
        <Route path="pratos/novo" element={<FormularioPrato />} />
      </Route>
    </Routes>
  );
}

export default App;
