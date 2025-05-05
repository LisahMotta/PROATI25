import React, { useState } from 'react';
import { FaLaptop, FaBarcode, FaInfoCircle, FaCheckCircle, FaSave, FaEraser, FaFilePdf } from 'react-icons/fa';
let jsPDF;

if (typeof window !== "undefined") {
  const jspdfModule = require('jspdf');
  jsPDF = jspdfModule.default;
}


export default function Equipamentos() {
  const [form, setForm] = useState({
    nome: '',
    numeroSerie: '',
    descricao: '',
    status: 'Disponível'
  });
  const [equipamentos, setEquipamentos] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEquipamentos(prev => [...prev, form]);
    setForm({
      nome: '',
      numeroSerie: '',
      descricao: '',
      status: 'Disponível'
    });
    alert('Equipamento salvo!');
  };

  const handleClear = () => {
    setForm({
      nome: '',
      numeroSerie: '',
      descricao: '',
      status: 'Disponível'
    });
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Lista de Equipamentos', 14, 18);
    doc.setFontSize(12);
    let y = 30;
    equipamentos.forEach((eq, idx) => {
      doc.text(`Equipamento ${idx + 1}:`, 14, y);
      doc.text(`Nome: ${eq.nome}`, 20, y + 8);
      doc.text(`Nº de Série: ${eq.numeroSerie}`, 20, y + 16);
      doc.text(`Descrição: ${eq.descricao}`, 20, y + 24);
      doc.text(`Status: ${eq.status}`, 20, y + 32);
      y += 42;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    });
    doc.save('equipamentos.pdf');
  };

  return (
    <div className="form-outer">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Cadastro de Equipamento</h2>

        <div className="form-group">
          <label className="form-label" htmlFor="nome">Nome do Equipamento</label>
          <div className="input-icon-group">
            <FaLaptop />
            <input
              className="input-field"
              type="text"
              id="nome"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              placeholder="Ex: Notebook Dell Latitude"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="numeroSerie">Número de Série</label>
          <div className="input-icon-group">
            <FaBarcode />
            <input
              className="input-field"
              type="text"
              id="numeroSerie"
              name="numeroSerie"
              value={form.numeroSerie}
              onChange={handleChange}
              placeholder="Ex: SN123456789"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="descricao">Descrição</label>
          <div className="input-icon-group">
            <FaInfoCircle />
            <textarea
              className="input-field"
              id="descricao"
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              placeholder="Descreva as características e especificações"
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="status">Status do Equipamento</label>
          <div className="input-icon-group">
            <FaCheckCircle />
            <select
              className="input-select"
              id="status"
              name="status"
              value={form.status}
              onChange={handleChange}
              required
            >
              <option value="Disponível">Disponível</option>
              <option value="Em Uso">Em Uso</option>
              <option value="Em Manutenção">Em Manutenção</option>
              <option value="Inativo">Inativo</option>
            </select>
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-save">
            <FaSave /> Salvar Equipamento
          </button>
          <button type="button" className="btn btn-clear" onClick={handleClear}>
            <FaEraser /> Limpar
          </button>
        </div>
        <div className="form-actions">
          <button type="button" className="btn btn-save" onClick={handleDownloadPDF} disabled={equipamentos.length === 0}>
            <FaFilePdf /> Baixar PDF
          </button>
        </div>
      </form>
    </div>
  );
}