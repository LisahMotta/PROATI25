import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Equipamentos from './pages/Equipamentos';
import Emprestimos from './pages/Emprestimos';
import CadastroOperador from './pages/CadastroOperador';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';
import './App.css';

function App() {
  const { usuario, setUsuario } = useAuth();

  if (!usuario) {
    return <Login />;
  }

  const isProati = usuario.tipo === 'PROATI';

  return (
    <div className="app-container">
      <nav className="main-nav">
        <Link to="/">Dashboard</Link>
        {isProati && <Link to="/equipamentos">Equipamentos</Link>}
        <Link to="/emprestimos">Empréstimos</Link>
        {isProati && <Link to="/cadastro-operador">Operadores</Link>}
        <button onClick={() => setUsuario(null)} className="logout-button">Sair</button>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route
          path="/equipamentos"
          element={isProati ? <Equipamentos /> : <Navigate to="/" />}
        />
        <Route path="/emprestimos" element={<Emprestimos />} />
        <Route
          path="/cadastro-operador"
          element={isProati ? <CadastroOperador podeCadastrar={isProati} /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;