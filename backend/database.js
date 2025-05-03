const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./controle.db');

// Criar a tabela se não existir
db.run(`
    CREATE TABLE IF NOT EXISTS equipamentos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT,
        numeroSerie TEXT,
        descricao TEXT,
        status TEXT,
        dataCadastro TEXT
    )
`);

module.exports = db;
