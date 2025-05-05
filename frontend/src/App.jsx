import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Equipamentos from './pages/Equipamentos';
import Emprestimos from './pages/Emprestimos';
import CadastroOperador from './pages/CadastroOperador';
import './App.css';

function App() {
  const isProati = true; // Definindo como true por padrão para acesso total

  return (
    <div className="app-container">
      <nav className="main-nav">
        <Link to="/">Dashboard</Link>
        <Link to="/equipamentos">Equipamentos</Link>
        <Link to="/emprestimos">Empréstimos</Link>
        <Link to="/cadastro-operador">Operadores</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/equipamentos" element={<Equipamentos />} />
        <Route path="/emprestimos" element={<Emprestimos />} />
        <Route path="/cadastro-operador" element={<CadastroOperador podeCadastrar={isProati} />} />
      </Routes>
    </div>
  );
}

export default App;