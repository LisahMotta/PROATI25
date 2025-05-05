import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard.jsx";
import Equipamentos from "./pages/Equipamentos.jsx";
import Emprestimos from "./pages/Emprestimos.jsx";
import fundo from "./assets/fundo.jpg";

function App() {
  const estiloApp = {
    backgroundImage: `url(${fundo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    minHeight: "100vh",
    color: "white",
    textShadow: "1px 1px 2px #000",
  };

  const estiloCabecalho = {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: "1rem",
    textAlign: "center",
  };

  const estiloMenu = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "1rem",
    textAlign: "center",
  };

  const estiloLink = {
    color: "white",
    margin: "0 1rem",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "18px",
  };

  return (
    <div style={estiloApp}>
      <header style={estiloCabecalho}>
        <h1>PROATI - Projeto de Apoio à Tecnologia e Informação</h1>
        <h2>Controle de Equipamentos</h2>
      </header>

      <nav style={estiloMenu}>
        <Link to="/" style={estiloLink}>Dashboard</Link>
        <Link to="/equipamentos" style={estiloLink}>Equipamentos</Link>
        <Link to="/emprestimos" style={estiloLink}>Empréstimos</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/equipamentos" element={<Equipamentos />} />
        <Route path="/emprestimos" element={<Emprestimos />} />
      </Routes>
    </div>
  );
}

export default App;
