import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CadastroOperador({ podeCadastrar }) {
  const [form, setForm] = useState({
    nome: '',
    usuario: '',
    senha: '',
    tipo: 'COMUM'
  });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Aqui você pode integrar com backend
    setMsg('Operador cadastrado com sucesso!');
    setForm({ nome: '', usuario: '', senha: '', tipo: 'COMUM' });
    navigate('/');
  };

  if (!podeCadastrar) {
    return (
      <div className="form-outer">
        <div className="form-card">
          <h2>Cadastro de Operador</h2>
          <p style={{ color: 'red' }}>Apenas usuários PROATI podem cadastrar operadores.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="form-outer">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Cadastro de Operador</h2>
        <div className="form-group">
          <label className="form-label" htmlFor="nome">Nome</label>
          <input
            className="input-field"
            type="text"
            id="nome"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>
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
        <div className="form-group">
          <label className="form-label" htmlFor="tipo">Tipo</label>
          <select
            className="input-select"
            id="tipo"
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            required
          >
            <option value="COMUM">Comum</option>
            <option value="PROATI">PROATI</option>
          </select>
        </div>
        {msg && <div style={{ color: 'green', marginBottom: 10 }}>{msg}</div>}
        <div className="form-actions">
          <button type="submit" className="btn btn-save">Cadastrar</button>
        </div>
      </form>
    </div>
  );
}
