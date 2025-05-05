const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());
app.use(cors());

// Exemplo simples de login
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  // Validação simples só para teste (Em produção utilize BD!)
  if (email === 'usuario@teste.com' && senha === '123456') {
    res.status(200).json({ mensagem: 'Login bem-sucedido!', token: 'token_fake_123' });
  } else {
    res.status(401).json({ mensagem: 'Credenciais inválidas!' });
  }
});

// Rota de teste
app.get('/', (req, res) => {
  res.send('Backend rodando!');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
