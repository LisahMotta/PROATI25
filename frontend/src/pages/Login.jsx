import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const usuariosExemplo = [
  { usuario: 'proati', senha: '1234', tipo: 'PROATI' },
  { usuario: 'operador', senha: '1234', tipo: 'COMUM' }
];

export default function Login() {
  const { setUsuario } = useAuth();
  const [form, setForm] = useState({ usuario: '', senha: '' });
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const user = usuariosExemplo.find(
      u => u.usuario === form.usuario && u.senha === form.senha
    );
    if (user) {
      setErro('');
      setUsuario(user);
      navigate('/');
    } else {
      setErro('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="form-outer">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Login do Sistema</h2>
        <div className="form-group">
          <label className="form-label" htmlFor="usuario">Usuário</label>
          <input
            className="input-field"
            type="text"
            id="usuario"
            name="usuario"
            value={form.usuario}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="senha">Senha</label>
          <input
            className="input-field"
            type="password"
            id="senha"
            name="senha"
            value={form.senha}
            onChange={handleChange}
            required
          />
        </div>
        {erro && <div style={{ color: 'red', marginBottom: 10 }}>{erro}</div>}
        <div className="form-actions">
          <button type="submit" className="btn btn-save">Entrar</button>
        </div>
      </form>
    </div>
  );
} 