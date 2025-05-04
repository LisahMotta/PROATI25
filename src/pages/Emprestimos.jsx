import React, { useState } from 'react';
import { FaSearch, FaUser, FaCalendarAlt, FaClock, FaPlus, FaUndo, FaBarcode, FaBoxOpen } from 'react-icons/fa';

const equipamentosCadastrados = [
  { numeroSerie: 'SN123456789', nome: 'Notebook Dell Latitude' },
  { numeroSerie: 'SN987654321', nome: 'Projetor Epson' },
  // Adicione mais equipamentos conforme necessário
];

export default function Emprestimos() {
  const [buscaSerie, setBuscaSerie] = useState('');
  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(null);
  const [form, setForm] = useState({
    professor: '',
    quantidade: 1,
    data: '',
    hora: ''
  });

  // Busca equipamento pelo número de série
  const handleBuscarEquipamento = () => {
    const eq = equipamentosCadastrados.find(e => e.numeroSerie === buscaSerie);
    setEquipamentoSelecionado(eq || null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEmprestimo = (e) => {
    e.preventDefault();
    if (!equipamentoSelecionado) {
      alert('Selecione um equipamento válido!');
      return;
    }
    // Lógica para registrar empréstimo
    alert('Empréstimo realizado com sucesso!');
  };

  const handleDevolucao = () => {
    // Lógica para devolução
    alert('Equipamento devolvido!');
  };

  return (
    <div className="form-outer">
      <form className="form-card" onSubmit={handleEmprestimo}>
        <h2>Cadastro de Empréstimo</h2>

        <div className="form-group">
          <label className="form-label" htmlFor="buscaSerie">Buscar Equipamento (Nº de Série)</label>
          <div className="input-icon-group">
            <FaBarcode />
            <input
              className="input-field"
              type="text"
              id="buscaSerie"
              name="buscaSerie"
              value={buscaSerie}
              onChange={e => setBuscaSerie(e.target.value)}
              placeholder="Digite o número de série"
              required
            />
            <button
              type="button"
              className="btn btn-save"
              style={{ padding: '0.5rem 1rem', fontSize: '1rem', marginLeft: 8 }}
              onClick={handleBuscarEquipamento}
            >
              <FaSearch /> Buscar
            </button>
          </div>
          {equipamentoSelecionado && (
            <div style={{ marginTop: 10, color: '#2563eb', fontWeight: 600 }}>
              <FaBoxOpen style={{ marginRight: 6 }} />
              {equipamentoSelecionado.nome}
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="professor">Professor</label>
          <div className="input-icon-group">
            <FaUser />
            <input
              className="input-field"
              type="text"
              id="professor"
              name="professor"
              value={form.professor}
              onChange={handleChange}
              placeholder="Nome do professor"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="quantidade">Quantidade de Equipamento</label>
          <div className="input-icon-group">
            <FaBoxOpen />
            <input
              className="input-field"
              type="number"
              id="quantidade"
              name="quantidade"
              min={1}
              value={form.quantidade}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group" style={{ display: 'flex', gap: 16 }}>
          <div style={{ flex: 1 }}>
            <label className="form-label" htmlFor="data">Data do Empréstimo</label>
            <div className="input-icon-group">
              <FaCalendarAlt />
              <input
                className="input-field"
                type="date"
                id="data"
                name="data"
                value={form.data}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <label className="form-label" htmlFor="hora">Hora do Empréstimo</label>
            <div className="input-icon-group">
              <FaClock />
              <input
                className="input-field"
                type="time"
                id="hora"
                name="hora"
                value={form.hora}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-save">
            <FaPlus /> Realizar Empréstimo
          </button>
          <button type="button" className="btn btn-clear" onClick={handleDevolucao}>
            <FaUndo /> Devolver Equipamento
          </button>
        </div>
      </form>
    </div>
  );
}