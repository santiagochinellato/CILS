import React from 'react';
import { useSanityConfig } from '../config/site.config';

export const TestSanityData: React.FC = () => {
  const { config, loading, error } = useSanityConfig();
  
  if (loading) {
    return (
      <div style={{ 
        padding: '20px', 
        background: '#f0f9ff', 
        margin: '20px',
        border: '2px solid #0ea5e9',
        borderRadius: '8px'
      }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#0ea5e9' }}>
          🔄 Cargando datos desde Sanity...
        </h2>
        <p style={{ margin: 0, color: '#64748b' }}>Espera un momento...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div style={{ 
        padding: '20px', 
        background: '#fef2f2', 
        margin: '20px',
        border: '2px solid #ef4444',
        borderRadius: '8px'
      }}>
        <h2 style={{ margin: '0 0 10px 0', color: '#ef4444' }}>
          ❌ Error cargando desde Sanity
        </h2>
        <p style={{ margin: '5px 0', color: '#991b1b' }}>{error.message}</p>
        <p style={{ marginTop: '10px', color: '#64748b', fontSize: '14px' }}>
          ⚠️ Usando datos estáticos como fallback...
        </p>
      </div>
    );
  }
  
  if (!config) {
    return (
      <div style={{ 
        padding: '20px', 
        background: '#fef2f2', 
        margin: '20px',
        border: '2px solid #ef4444',
        borderRadius: '8px'
      }}>
        <h2 style={{ margin: 0, color: '#ef4444' }}>
          ⚠️ No hay configuración disponible
        </h2>
      </div>
    );
  }
  
  return (
    <div style={{ 
      padding: '20px', 
      background: '#f0fdf4', 
      margin: '20px',
      border: '2px solid #22c55e',
      borderRadius: '8px'
    }}>
      <h2 style={{ margin: '0 0 15px 0', color: '#22c55e' }}>
        ✅ Datos cargados desde Sanity!
      </h2>
      
      <div style={{ marginTop: '15px', padding: '10px', background: 'white', borderRadius: '4px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Hero Section:</h3>
        <p style={{ margin: '5px 0' }}><strong>Título:</strong> {config.hero.title}</p>
        <p style={{ margin: '5px 0' }}><strong>Subtítulo:</strong> {config.hero.subtitle}</p>
        <p style={{ margin: '5px 0' }}><strong>Badge:</strong> {config.hero.badge}</p>
      </div>
      
      <div style={{ marginTop: '15px', padding: '10px', background: 'white', borderRadius: '4px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Servicios:</h3>
        <p style={{ margin: '5px 0' }}><strong>{config.services.length}</strong> servicios encontrados</p>
        <ul style={{ margin: '5px 0', paddingLeft: '20px' }}>
          {config.services.slice(0, 3).map(s => (
            <li key={s.title}>{s.title}</li>
          ))}
          {config.services.length > 3 && <li>...</li>}
        </ul>
      </div>
      
      <div style={{ marginTop: '15px', padding: '10px', background: 'white', borderRadius: '4px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Clientes:</h3>
        <p style={{ margin: '5px 0' }}><strong>{config.clients.length}</strong> clientes encontrados</p>
      </div>
      
      <div style={{ marginTop: '15px', padding: '10px', background: 'white', borderRadius: '4px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Equipo:</h3>
        <p style={{ margin: '5px 0' }}><strong>{config.team?.staff.length || 0}</strong> miembros encontrados</p>
      </div>
      
      <div style={{ marginTop: '15px', padding: '10px', background: 'white', borderRadius: '4px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Links:</h3>
        <p style={{ margin: '5px 0' }}><strong>{config.links?.length || 0}</strong> links encontrados</p>
      </div>
      
      <div style={{ marginTop: '15px', padding: '10px', background: '#fef3c7', borderRadius: '4px', fontSize: '14px' }}>
        <p style={{ margin: 0, color: '#92400e' }}>
          💡 <strong>Nota:</strong> Este es un componente de prueba. Remuévelo cuando verifiques que todo funciona.
        </p>
      </div>
    </div>
  );
};

