import React from 'react';
import { Routes, Route, Link, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Equipamentos from './pages/Equipamentos';
import Emprestimos from './pages/Emprestimos';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';
import './App.css';

function App() {
  const { usuario, logout } = useAuth();

  if (!usuario) {
    return <Login />;
  }

  return (
    <div className="app-container">
      <nav className="main-nav">
        <span className="usuario-logado">
          Usuário: <strong>{usuario.nome}</strong> ({usuario.tipo})
        </span>
        <Link to="/">Dashboard</Link>
        <Link to="/equipamentos">Equipamentos</Link>
        <Link to="/emprestimos">Empréstimos</Link>
        <button 
          onClick={logout}
          className="logout-button pequeno"
        >
          Sair
        </button>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/equipamentos" element={<Equipamentos />} />
        <Route path="/emprestimos" element={<Emprestimos />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;