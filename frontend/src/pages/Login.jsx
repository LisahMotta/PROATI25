import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://URL-DO-SEU-BACKEND/login', { email, senha });
      alert(res.data.mensagem);
      localStorage.setItem('token', res.data.token);
      // redirecione após login
    } catch (erro) {
      alert(erro.response.data.mensagem);
    }
  };

  return (
    <div>
      <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input type="password" placeholder="Senha" value={senha} onChange={(e)=>setSenha(e.target.value)} />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
};

export default Login;
