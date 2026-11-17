import React, { useState } from 'react';

/**
 * Ejercicio 4.3: Clasificador de temperatura con funciones y renderizado condicional
 * Requisitos:
 * Programa con funciones y una constante con temperatura que responde:
 * - Valor temp. entre 0 y 10ºC -> 'Molt fred'
 * - Valor temp. entre 10 y 20ºC -> 'Temperatura mitjana'
 * - Valor temp. entre 20 y 30ºC -> 'Calor'
 */
export default function ProgramaTemperatura({ tempInicial = 15 }) {
  // Constante con temperatura (con estado para pruebas interactivas)
  const [temperatura, setTemperatura] = useState(tempInicial);

  // Función pura de validación
  const validar = (dato) => {
    const valor = Number(dato);
    return isNaN(valor) ? null : valor;
  };

  // Función pura para clasificar la temperatura mediante operadores ternarios
  const clasificarTemperatura = (temp) => {
    if (temp === null) return 'Valor de temperatura invàlid';

    // Operadores ternarios limpios para evaluar los rangos solicitados
    const estado =
      temp >= 0 && temp < 10
        ? 'Molt fred'
        : temp >= 10 && temp < 20
        ? 'Temperatura mitjana'
        : temp >= 20 && temp <= 30
        ? 'Calor'
        : temp < 0
        ? 'Molt fred (Sota zero)'
        : 'Calor extrema (>30ºC)';

    return estado;
  };

  // Función pura para componer el texto final
  const textoFinal = (valorTemp, estado) => {
    return `A ${valorTemp}ºC fa: ${estado}`;
  };

  // Función orquestadora
  const inicio = (dato) => {
    const tempValida = validar(dato);
    const estado = clasificarTemperatura(tempValida);
    return textoFinal(tempValida !== null ? tempValida : dato, estado);
  };

  // Función auxiliar para color del badge según temperatura
  const obtenerColorClase = (temp) => {
    const t = Number(temp);
    if (t < 10) return 'badge-frio';
    if (t < 20) return 'badge-templado';
    return 'badge-calor';
  };

  return (
    <div className="card-ejercicio">
      <div className="card-header">
        <span className="badge">Ejercicio 4.3</span>
        <h3>Sensor de Temperatura</h3>
      </div>

      <div className="card-body">
        {/* Resultado */}
        <div className="resultado-box">
          <p className="resultado-principal">
            <strong>Temperatura actual:</strong> {temperatura}ºC <br />
            <strong>Diagnóstico:</strong>{' '}
            <span className={`badge-temp ${obtenerColorClase(temperatura)}`}>
              {clasificarTemperatura(validar(temperatura))}
            </span>
          </p>
          <p className="texto-secundario">{inicio(temperatura)}</p>
        </div>

        {/* Controles para probar */}
        <div className="controles-prueba">
          <label htmlFor="temp-slider">
            <strong>Ajustar temperatura ({temperatura}ºC): </strong>
          </label>
          <input
            id="temp-slider"
            type="range"
            min="-5"
            max="35"
            step="1"
            value={temperatura}
            onChange={(e) => setTemperatura(Number(e.target.value))}
            className="slider-estilizado"
          />

          <div className="botones-rapidos">
            <button type="button" onClick={() => setTemperatura(5)} className="btn-test">
              5ºC ➔ Molt fred (0 a 10ºC)
            </button>
            <button type="button" onClick={() => setTemperatura(15)} className="btn-test">
              15ºC ➔ Temperatura mitjana (10 a 20ºC)
            </button>
            <button type="button" onClick={() => setTemperatura(25)} className="btn-test">
              25ºC ➔ Calor (20 a 30ºC)
            </button>
          </div>
        </div>

        <div className="explicacion-reglas">
          <h4>Rangos evaluados:</h4>
          <ul>
            <li><code>0ºC &lt;= temp &lt; 10ºC</code>: <strong>Molt fred</strong></li>
            <li><code>10ºC &lt;= temp &lt; 20ºC</code>: <strong>Temperatura mitjana</strong></li>
            <li><code>20ºC &lt;= temp &lt;= 30ºC</code>: <strong>Calor</strong></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
