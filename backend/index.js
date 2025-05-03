// Backend index.js
const express = require('express');
const app = express();
const PORT = 4000;

app.use(express.json());

let equipamentos = [];

app.get('/equipamentos', (req, res) => res.json(equipamentos));

app.post('/equipamentos', (req, res) => {
  const equipamento = req.body;
  equipamento.status = 'Disponível';
  equipamentos.push(equipamento);
  res.status(201).json({ message: 'Equipamento cadastrado!' });
});

app.listen(PORT, () => console.log(`Backend rodando na porta ${PORT}`));