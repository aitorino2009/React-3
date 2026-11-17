import React, { useState } from 'react';
import { calcularTarifaEnvio, obtenerDesgloseTarifa } from '../utils/logicaEnvios.js';

// Re-exportamos para compatibilidad directa
export { calcularTarifaEnvio, obtenerDesgloseTarifa };

/**
 * =========================================================================
 * COMPONENTE: EcoEnvios.jsx
 * Widget corporativo para EcoShop Solutions
 * =========================================================================
 */
export default function EcoEnvios({
  initialUserAge = 29,
  initialPurchaseAmount = 45,
  initialIsEcoMember = true
}) {
  // Variables de entrada según enunciado (29, 45, true por defecto)
  const [userAge, setUserAge] = useState(initialUserAge);
  const [purchaseAmount, setPurchaseAmount] = useState(initialPurchaseAmount);
  const [isEcoMember, setIsEcoMember] = useState(initialIsEcoMember);

  // Invocación a funciones puras
  const textoTarifa = calcularTarifaEnvio(userAge, purchaseAmount, isEcoMember);
  const desglose = obtenerDesgloseTarifa(userAge, purchaseAmount, isEcoMember);

  // Estilos en línea requeridos para simular un widget corporativo profesional
  const estiloContenedorPrincipal = {
    border: '2px solid #2e7d32',
    borderRadius: '16px',
    padding: '24px',
    backgroundColor: '#f6fbf7',
    maxWidth: '680px',
    margin: '20px auto',
    boxShadow: '0 8px 24px rgba(46, 125, 50, 0.12)',
    fontFamily: "'Segoe UI', Roboto, system-ui, sans-serif",
    color: '#1b4332'
  };

  const estiloCabecera = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1.5px solid #d8ebd9',
    paddingBottom: '14px',
    marginBottom: '20px'
  };

  const estiloInsigniaEmpresa = {
    backgroundColor: '#2e7d32',
    color: '#ffffff',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600',
    letterSpacing: '0.5px'
  };

  const estiloCajaResultado = {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '18px',
    border: '1.5px solid #b7e4c7',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  };

  const estiloTextoTarifa = {
    fontSize: '1.35rem',
    fontWeight: 'bold',
    color: textoTarifa.includes('0€')
      ? '#15803d'
      : textoTarifa.includes('1.50€')
      ? '#0284c7'
      : '#b45309'
  };

  return (
    <div style={estiloContenedorPrincipal}>
      {/* Cabecera del widget */}
      <div style={estiloCabecera}>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.3rem', color: '#1b4332' }}>
            🌱 EcoShop Solutions
          </h3>
          <span style={{ fontSize: '0.88rem', color: '#40916c' }}>
            Validador de Descuentos &quot;GreenTech&quot;
          </span>
        </div>
        <span style={estiloInsigniaEmpresa}>E-COMMERCE SOSTENIBLE</span>
      </div>

      {/* Resultado Principal del cálculo */}
      <div style={estiloCajaResultado}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.95rem', fontWeight: 600, color: '#2d6a4f' }}>
            Tarifa de Envío Calculada:
          </span>
          <span style={estiloTextoTarifa}>{textoTarifa}</span>
        </div>

        <div style={{ fontSize: '0.9rem', color: '#52796f' }}>
          <strong>Motivo:</strong> {desglose.motivo}
        </div>

        <div
          style={{
            borderTop: '1px dashed #d8ebd9',
            marginTop: '8px',
            paddingTop: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.95rem'
          }}
        >
          <span>Compra: <strong>{Number(purchaseAmount).toFixed(2)}€</strong> + Envío: <strong>{desglose.costeEnvio.toFixed(2)}€</strong></span>
          <span style={{ fontWeight: 'bold', color: '#1b4332' }}>
            Total carrito: {desglose.totalPedido}€
          </span>
        </div>
      </div>

      {/* Panel de parámetros para pruebas interactivas */}
      <div
        style={{
          backgroundColor: '#ebf6ed',
          borderRadius: '10px',
          padding: '16px',
          marginBottom: '18px'
        }}
      >
        <h4 style={{ margin: '0 0 12px 0', fontSize: '1rem', color: '#2d6a4f' }}>
          ⚙️ Parámetros del Cliente y Carrito
        </h4>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '12px'
          }}
        >
          {/* Edad */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
              Edad del cliente (userAge):
            </label>
            <input
              type="number"
              min="1"
              max="120"
              value={userAge}
              onChange={(e) => setUserAge(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid #74c69d',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Importe */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px' }}>
              Importe de compra (purchaseAmount €):
            </label>
            <input
              type="number"
              min="0"
              step="0.5"
              value={purchaseAmount}
              onChange={(e) => setPurchaseAmount(Number(e.target.value))}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                border: '1px solid #74c69d',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Membresía */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
              Membresía Club Verde:
            </span>
            <label
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer',
                fontWeight: 500
              }}
            >
              <input
                type="checkbox"
                checked={isEcoMember}
                onChange={(e) => setIsEcoMember(e.target.checked)}
                style={{ width: '18px', height: '18px', cursor: 'pointer' }}
              />
              {isEcoMember ? '🌿 Miembro Activo (true)' : '❌ No es miembro (false)'}
            </label>
          </div>
        </div>
      </div>

      {/* Botones de escenarios preconfigurados para evaluación rápida */}
      <div style={{ marginBottom: '16px' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#40916c', display: 'block', marginBottom: '8px' }}>
          Casos de prueba rápidos:
        </span>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button
            type="button"
            onClick={() => { setUserAge(16); setPurchaseAmount(25); setIsEcoMember(false); }}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #74c69d',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              fontSize: '0.82rem'
            }}
          >
            👦 Menor de 18 (16a, 25€) ➔ 0€
          </button>
          <button
            type="button"
            onClick={() => { setUserAge(35); setPurchaseAmount(60); setIsEcoMember(false); }}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #74c69d',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              fontSize: '0.82rem'
            }}
          >
            🛒 Compra &gt; 50€ (35a, 60€) ➔ 0€
          </button>
          <button
            type="button"
            onClick={() => { setUserAge(29); setPurchaseAmount(45); setIsEcoMember(true); }}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #74c69d',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              fontSize: '0.82rem'
            }}
          >
            🌿 Socio 18-65 (29a, 45€, Eco) ➔ 1.50€
          </button>
          <button
            type="button"
            onClick={() => { setUserAge(30); setPurchaseAmount(40); setIsEcoMember(false); }}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #74c69d',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              fontSize: '0.82rem'
            }}
          >
            📦 Estándar (30a, 40€, No eco) ➔ 4.95€
          </button>
          <button
            type="button"
            onClick={() => { setUserAge(70); setPurchaseAmount(30); setIsEcoMember(true); }}
            style={{
              padding: '6px 12px',
              borderRadius: '6px',
              border: '1px solid #74c69d',
              backgroundColor: '#ffffff',
              cursor: 'pointer',
              fontSize: '0.82rem'
            }}
          >
            👴 Senior &gt;65 (70a, 30€, Eco) ➔ 4.95€
          </button>
        </div>
      </div>

      {/* Resumen de reglas aplicadas */}
      <details style={{ fontSize: '0.85rem', color: '#2d6a4f', marginTop: '10px' }}>
        <summary style={{ cursor: 'pointer', fontWeight: 600 }}>
          📋 Ver especificación de reglas de negocio
        </summary>
        <ul style={{ margin: '8px 0 0 16px', paddingLeft: 0, lineHeight: '1.6' }}>
          <li>
            <strong>1. Envío Gratuito:</strong> <code>userAge &lt; 18 || purchaseAmount &gt; 50</code> ➔ <em>¡Envío Gratuito! (0€)</em>
          </li>
          <li>
            <strong>2. Descuento Membresía:</strong> <code>isEcoMember === true &amp;&amp; userAge &gt;= 18 &amp;&amp; userAge &lt;= 65</code> ➔ <em>Tarifa Eco: 1.50€</em>
          </li>
          <li>
            <strong>3. Tarifa Estándar:</strong> Cualquier otro caso ➔ <em>Tarifa Estándar: 4.95€</em>
          </li>
        </ul>
      </details>
    </div>
  );
}
