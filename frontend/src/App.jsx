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

  return (
    <div className="app-container">
      {usuario && (
        <nav className="main-nav">
          <span className="usuario-logado">
            Usuário: <strong>{usuario.nome}</strong> ({usuario.tipo})
          </span>
          <Link to="/">Dashboard</Link>
          <Link to="/equipamentos">Equipamentos</Link>
          <Link to="/emprestimos">Empréstimos</Link>
          <button 
            onClick={() => {
              logout();
              window.location.href = '/';
            }} 
            className="logout-button pequeno"
          >
            Sair
          </button>
        </nav>
      )}
      <Routes>
        <Route path="/login" element={!usuario ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/" element={usuario ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path="/equipamentos" element={usuario ? <Equipamentos /> : <Navigate to="/login" replace />} />
        <Route path="/emprestimos" element={usuario ? <Emprestimos /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;