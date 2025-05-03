const db = require('./database');
const fs = require('fs');
const path = require('path');

function exportarEquipamentos() {
    return new Promise((resolve, reject) => {
        const data = new Date();
        const nomeArquivo = `equipamentos_${data.toISOString().split('T')[0]}.csv`;
        const caminhoArquivo = path.join(__dirname, 'exports', nomeArquivo);

        // Cria diretório de exportação se não existir
        if (!fs.existsSync(path.join(__dirname, 'exports'))) {
            fs.mkdirSync(path.join(__dirname, 'exports'));
        }

        // Cabeçalho do CSV
        const cabecalho = 'ID,Nome,Número de Série,Descrição,Status,Data de Cadastro,Última Atualização\n';
        fs.writeFileSync(caminhoArquivo, cabecalho);

        // Consulta os dados
        db.all(`
            SELECT id, nome, numeroSerie, descricao, status, 
                   dataCadastro, ultimaAtualizacao 
            FROM equipamentos
            ORDER BY id
        `, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }

            // Adiciona cada linha ao arquivo
            rows.forEach(row => {
                const linha = [
                    row.id,
                    `"${row.nome}"`,
                    `"${row.numeroSerie}"`,
                    `"${row.descricao || ''}"`,
                    `"${row.status}"`,
                    `"${row.dataCadastro}"`,
                    `"${row.ultimaAtualizacao}"`
                ].join(',') + '\n';
                
                fs.appendFileSync(caminhoArquivo, linha);
            });

            resolve({
                nomeArquivo,
                caminhoArquivo,
                quantidade: rows.length
            });
        });
    });
}

function exportarEmprestimos() {
    return new Promise((resolve, reject) => {
        const data = new Date();
        const nomeArquivo = `emprestimos_${data.toISOString().split('T')[0]}.csv`;
        const caminhoArquivo = path.join(__dirname, 'exports', nomeArquivo);

        // Cria diretório de exportação se não existir
        if (!fs.existsSync(path.join(__dirname, 'exports'))) {
            fs.mkdirSync(path.join(__dirname, 'exports'));
        }

        // Cabeçalho do CSV
        const cabecalho = 'ID,Equipamento,Número de Série,Professor,Quantidade,Data Empréstimo,Data Devolução,Status\n';
        fs.writeFileSync(caminhoArquivo, cabecalho);

        // Consulta os dados
        db.all(`
            SELECT e.id, eq.nome as equipamento, eq.numeroSerie, 
                   e.professor, e.quantidade, e.dataEmprestimo, 
                   e.dataDevolucao, e.status
            FROM emprestimos e
            JOIN equipamentos eq ON e.equipamentoId = eq.id
            ORDER BY e.id
        `, [], (err, rows) => {
            if (err) {
                reject(err);
                return;
            }

            // Adiciona cada linha ao arquivo
            rows.forEach(row => {
                const linha = [
                    row.id,
                    `"${row.equipamento}"`,
                    `"${row.numeroSerie}"`,
                    `"${row.professor}"`,
                    row.quantidade,
                    `"${row.dataEmprestimo}"`,
                    `"${row.dataDevolucao || ''}"`,
                    `"${row.status}"`
                ].join(',') + '\n';
                
                fs.appendFileSync(caminhoArquivo, linha);
            });

            resolve({
                nomeArquivo,
                caminhoArquivo,
                quantidade: rows.length
            });
        });
    });
}

module.exports = {
    exportarEquipamentos,
    exportarEmprestimos
};
