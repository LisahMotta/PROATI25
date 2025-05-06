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

// Conexão e criação das tabelas no SQLite
const db = new sqlite3.Database('./usuarios.db');
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    senha TEXT NOT NULL,
    tipo TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS equipamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    status TEXT DEFAULT 'disponível'
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS emprestimos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    equipamento_id INTEGER,
    usuario_id INTEGER,
    data_emprestimo TEXT,
    data_devolucao TEXT,
    FOREIGN KEY (equipamento_id) REFERENCES equipamentos(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
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
    if (err) return res.status(400).json({ mensagem: "Erro ao cadastrar usuário ou usuário já existente." });
    res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
  });
});

// Login de usuário
app.post('/login', (req, res) => {
  const { email, senha } = req.body;

  db.get("SELECT * FROM usuarios WHERE email = ?", [email], (err, usuario) => {
    if (err || !usuario) return res.status(401).json({ mensagem: "Credenciais inválidas." });

    const senhaValida = bcrypt.compareSync(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ mensagem: "Credenciais inválidas." });

    const token = jwt.sign({ id: usuario.id, tipo: usuario.tipo }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ mensagem: "Login bem-sucedido!", token, tipo: usuario.tipo });
  });
});

// Cadastro de equipamento
app.post('/equipamentos', (req, res) => {
  const { nome, descricao } = req.body;
  if (!nome) return res.status(400).json({ mensagem: "Nome do equipamento é obrigatório." });

  const stmt = db.prepare("INSERT INTO equipamentos (nome, descricao) VALUES (?, ?)");
  stmt.run(nome, descricao, function(err) {
    if (err) return res.status(400).json({ mensagem: "Erro ao cadastrar equipamento." });
    res.status(201).json({ mensagem: "Equipamento cadastrado com sucesso!", id: this.lastID });
  });
});

// Listar equipamentos
app.get('/equipamentos', (req, res) => {
  db.all("SELECT * FROM equipamentos", (err, rows) => {
    if (err) return res.status(500).json({ mensagem: "Erro ao buscar equipamentos." });
    res.json(rows);
  });
});

// Cadastrar empréstimo
app.post('/emprestimos', (req, res) => {
  const { equipamento_id, usuario_id, data_emprestimo } = req.body;
  if (!equipamento_id || !usuario_id) return res.status(400).json({ mensagem: "Dados obrigatórios faltando." });

  const stmt = db.prepare("INSERT INTO emprestimos (equipamento_id, usuario_id, data_emprestimo) VALUES (?, ?, ?)");
  stmt.run(equipamento_id, usuario_id, data_emprestimo, function(err) {
    if (err) return res.status(400).json({ mensagem: "Erro ao registrar empréstimo." });
    res.status(201).json({ mensagem: "Empréstimo registrado com sucesso!", id: this.lastID });
  });
});

// Dashboard - contar equipamentos e empréstimos
app.get('/dashboard', (req, res) => {
  db.serialize(() => {
    db.get("SELECT COUNT(*) as total FROM equipamentos", (err, equipamentos) => {
      db.get("SELECT COUNT(*) as total FROM emprestimos", (err2, emprestimos) => {
        res.json({
          totalEquipamentos: equipamentos.total,
          totalEmprestimos: emprestimos.total
        });
      });
    });
  });
});

// Servir arquivos estáticos do React
app.use(express.static(path.join(__dirname, 'frontend/build')));

// Redirecionar todas as rotas para index.html (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
