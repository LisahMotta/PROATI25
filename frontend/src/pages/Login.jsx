import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { setUsuario } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro('');

    // Aqui você pode adicionar a lógica de autenticação real
    // Por enquanto, vamos simular um login simples
    if (email === 'admin@proati.com.br' && senha === 'admin123') {
      setUsuario({
        email,
        tipo: 'PROATI',
        nome: 'Administrador'
      });
    } else if (email === 'operador@proati.com.br' && senha === 'operador123') {
      setUsuario({
        email,
        tipo: 'OPERADOR',
        nome: 'Operador'
      });
    } else {
      setErro('Email ou senha inválidos');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Controle de Equipamentos</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="senha">Senha:</label>
            <input
              type="password"
              id="senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          {erro && <div className="erro-mensagem">{erro}</div>}
          <button type="submit">Entrar</button>
        </form>
        <div className="login-info">
          <p>Credenciais de teste:</p>
          <p>Admin: admin@proati.com.br / admin123</p>
          <p>Operador: operador@proati.com.br / operador123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
