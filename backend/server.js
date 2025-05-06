const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Conexão e configuração do banco SQLite
const db = new sqlite3.Database('./usuarios.db');
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    tipo TEXT NOT NULL
  )`);
});

// Cadastro de usuário
app.post('/cadastrar', (req, res) => {
  const { nome, email, senha, tipo } = req.body;

  if (!nome || !email || !senha || !tipo) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
  }

  const hashSenha = bcrypt.hashSync(senha, 8);

  const stmt = db.prepare("INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)");
  stmt.run(nome, email, hashSenha, tipo, function(err) {
    if (err) {
      return res.status(400).json({ mensagem: "Erro ao cadastrar usuário ou usuário já existente." });
    }
    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
  });
});

// Login seguro usando SQLite e JWT
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  db.get("SELECT * FROM usuarios WHERE email = ?", [email], (err, usuario) => {
    if (err || !usuario) {
      return res.status(401).json({ mensagem: "Credenciais inválidas." });
    }

    const senhaValida = bcrypt.compareSync(senha, usuario.senha);
    if (!senhaValida) {
      return res.status(401).json({ mensagem: "Credenciais inválidas." });
    }

    const token = jwt.sign({ id: usuario.id, tipo: usuario.tipo }, process.env.JWT_SECRET, { expiresIn: '2h' });

    res.json({ mensagem: "Login bem-sucedido!", token, tipo: usuario.tipo });
  });
});

// Servir arquivos estáticos do React
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Redirecionar todas as rotas (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
