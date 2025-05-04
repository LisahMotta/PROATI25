import React from 'react';
import { FaTabletAlt, FaLaptop, FaChrome } from 'react-icons/fa';

// Exemplo de dados fictícios. No futuro, pode ser integrado ao backend.
const dadosEquipamentos = {
  tablets: { total: 0, emUso: 0, disponivel: 0 },
  chromebooks: { total: 0, emUso: 0, disponivel: 0 },
  notebooks: { total: 0, emUso: 0, disponivel: 0 },
};

const cardStyle = {
  background: '#fff',
  borderRadius: '16px',
  boxShadow: '0 4px 16px rgba(37,99,235,0.10)',
  padding: '2rem 1.5rem',
  minWidth: 220,
  flex: 1,
  margin: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const iconStyle = { fontSize: 48, marginBottom: 12 };
const labelStyle = { fontWeight: 700, color: '#2563eb', fontSize: 22, marginBottom: 8 };
const valueStyle = { fontSize: 36, fontWeight: 700, color: '#1e40af' };
const subLabelStyle = { fontSize: 16, color: '#64748b', marginBottom: 4 };

export default function Dashboard() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: '#2563eb', textAlign: 'center', marginBottom: 32, fontWeight: 700 }}>Painel de Equipamentos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center' }}>
        {/* Tablets */}
        <div style={cardStyle}>
          <FaTabletAlt style={{ ...iconStyle, color: '#22d3ee' }} />
          <div style={labelStyle}>Tablets</div>
          <div style={subLabelStyle}>Total</div>
          <div style={valueStyle}>{dadosEquipamentos.tablets.total}</div>
          <div style={subLabelStyle}>Em Uso</div>
          <div style={valueStyle}>{dadosEquipamentos.tablets.emUso}</div>
          <div style={subLabelStyle}>Disponível</div>
          <div style={valueStyle}>{dadosEquipamentos.tablets.disponivel}</div>
        </div>
        {/* Chromebooks */}
        <div style={cardStyle}>
          <FaChrome style={{ ...iconStyle, color: '#f59e42' }} />
          <div style={labelStyle}>Chromebooks</div>
          <div style={subLabelStyle}>Total</div>
          <div style={valueStyle}>{dadosEquipamentos.chromebooks.total}</div>
          <div style={subLabelStyle}>Em Uso</div>
          <div style={valueStyle}>{dadosEquipamentos.chromebooks.emUso}</div>
          <div style={subLabelStyle}>Disponível</div>
          <div style={valueStyle}>{dadosEquipamentos.chromebooks.disponivel}</div>
        </div>
        {/* Notebooks */}
        <div style={cardStyle}>
          <FaLaptop style={{ ...iconStyle, color: '#2563eb' }} />
          <div style={labelStyle}>Notebooks</div>
          <div style={subLabelStyle}>Total</div>
          <div style={valueStyle}>{dadosEquipamentos.notebooks.total}</div>
          <div style={subLabelStyle}>Em Uso</div>
          <div style={valueStyle}>{dadosEquipamentos.notebooks.emUso}</div>
          <div style={subLabelStyle}>Disponível</div>
          <div style={valueStyle}>{dadosEquipamentos.notebooks.disponivel}</div>
        </div>
      </div>
    </div>
  );
}