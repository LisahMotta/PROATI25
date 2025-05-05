import React, { useState } from 'react';
import axios from 'axios';

function CadastroUsuario() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [tipo, setTipo] = useState('Professor');

  const handleCadastro = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://URL-DO-SEU-BACKEND/cadastrar', {
        nome,
        email,
        senha,
        tipo
      });
      alert(res.data.mensagem);
    } catch (erro) {
      alert(erro.response.data.mensagem);
    }
  };

  return (
    <form onSubmit={handleCadastro}>
      <input
        type="text"
        placeholder="Nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />

      <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
        <option value="PROATI">PROATI</option>
        <option value="Gestão">Gestão</option>
        <option value="Professor">Professor</option>
        <option value="AOE">AOE</option>
      </select>

      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default CadastroUsuario;
