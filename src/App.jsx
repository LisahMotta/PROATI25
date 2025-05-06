import React from 'react';
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Equipamentos from './pages/Equipamentos';
import Emprestimos from './pages/Emprestimos';
import CadastroOperador from './pages/CadastroOperador';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';
import './App.css';

// Fundo
import fundo from './assets/fundo.png';

function App() {
  const { usuario, setUsuario } = useAuth();
  const location = useLocation();

  const isLoginPage = !usuario;
  const isProati = usuario?.tipo === 'PROATI';

  return (
    <div
      style={{
        backgroundImage: !isLoginPage ? `url(${fundo})` : 'none',
        backgroundColor: isLoginPage ? '#1976d2' : 'transparent',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        width: '100%',
        paddingBottom: '50px' // evita cortar conteúdo
      }}
    >
      {!usuario ? (
        <Login />
      ) : (
        <>
          <nav style={{ padding: 20 }}>
            <Link to="/">Dashboard</Link>
            {isProati && <Link to="/equipamentos" style={{ marginLeft: 20 }}>Equipamentos</Link>}
            <Link to="/emprestimos" style={{ marginLeft: 20 }}>Empréstimos</Link>
            {isProati && <Link to="/cadastro-operador" style={{ marginLeft: 20 }}>Operadores</Link>}
            <button onClick={() => setUsuario(null)} style={{ marginLeft: 20 }}>Sair</button>
          </nav>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/equipamentos" element={isProati ? <Equipamentos /> : <Navigate to="/" />} />
            <Route path="/emprestimos" element={<Emprestimos />} />
            <Route path="/cadastro-operador" element={isProati ? <CadastroOperador podeCadastrar={isProati} /> : <Navigate to="/" />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
