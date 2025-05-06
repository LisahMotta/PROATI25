import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';
import fundoImg from '../assets/fundo.jpg';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [isCadastro, setIsCadastro] = useState(false);
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('PROATI');
  const { setUsuario } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErro('');

    if (isCadastro) {
      if (!nome || !email || !senha || !tipo) {
        setErro('Preencha todos os campos!');
        return;
      }
      setUsuario({
        email,
        tipo,
        nome
      });
      navigate('/');
      return;
    }

    // Login simples
    setUsuario({
      email,
      tipo,
      nome: email.split('@')[0]
    });
    navigate('/');
  };

  return (
    <div
      className="login-container"
      style={{
        background: `url(${fundoImg}) no-repeat center center fixed`,
        backgroundSize: "cover"
      }}
    >
      <div className="login-box">
        <h1>Controle de Equipamentos</h1>
        <form onSubmit={handleSubmit}>
          {isCadastro && (
            <>
              <div className="form-group">
                <label htmlFor="nome">Nome:</label>
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required={isCadastro}
                />
              </div>
              <div className="form-group">
                <label htmlFor="tipo">Tipo de Usuário:</label>
                <select
                  id="tipo"
                  value={tipo}
                  onChange={e => setTipo(e.target.value)}
                  required
                >
                  <option value="PROATI">PROATI</option>
                  <option value="AOE">AOE</option>
                  <option value="PROFESSOR">Professor</option>
                </select>
              </div>
            </>
          )}
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
          <button type="submit">{isCadastro ? 'Cadastrar' : 'Entrar'}</button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <button
            type="button"
            style={{ background: 'none', color: '#007bff', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: '1rem' }}
            onClick={() => {
              setIsCadastro(!isCadastro);
              setErro('');
            }}
          >
            {isCadastro ? 'Já tem conta? Entrar' : 'Não tem conta? Cadastre-se'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
