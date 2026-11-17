import React, { useState } from 'react';

/**
 * Ejercicio 4.1: Renderizado condicional con cálculo del precio de billete de autobús
 * Requisitos:
 * a) Si la edad es mayor o igual a 65 años, el precio del billete es 0 € (jubilados)
 * b) Si la edad es mayor o igual a 18 años, el precio del billete es 1 € (adultos)
 * c) Los menores de edad no pagan (0 €)
 */
export default function ProgramaPrecio({ edadInicial = 25 }) {
  // Constante requerida por el enunciado original (por defecto 25)
  const [edad, setEdad] = useState(edadInicial);

  // Función pura para comprobar el precio según la edad con operadores ternarios
  function comprobar(dato) {
    const edadNum = Number(dato);
    // a) edad >= 65 -> 0 €; b) edad >= 18 -> 1 €; c) menor de 18 -> 0 €
    const resultado = (edadNum >= 65) ? 0 : (edadNum >= 18) ? 1 : 0;
    return resultado;
  }

  // Función pura para dar formato al mensaje final
  function textoFinal(valor) {
    const unidad = valor === 1 ? 'euro' : 'euros';
    return `El precio es ${valor} ${unidad}`;
  }

  // Función orquestadora
  function inicio(datoedad) {
    const precio = comprobar(datoedad);
    const final = textoFinal(precio);
    return final;
  }

  return (
    <div className="card-ejercicio">
      <div className="card-header">
        <span className="badge">Ejercicio 4.1</span>
        <h3>Precio billete autobús</h3>
      </div>

      <div className="card-body">
        {/* Resultado directo del código tal como pide el enunciado */}
        <div className="resultado-box">
          <p className="resultado-principal">
            <strong>Resultado para {edad} años:</strong> {inicio(edad)}
          </p>
        </div>

        {/* Controles interactivos para que el profesor/usuario pueda probar */}
        <div className="controles-prueba">
          <label htmlFor="edad-input-41">
            <strong>Modificar edad para probar: </strong>
          </label>
          <input
            id="edad-input-41"
            type="number"
            min="0"
            max="120"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            className="input-estilizado"
          />

          <div className="botones-rapidos">
            <button type="button" onClick={() => setEdad(10)} className="btn-test">
              Menor (10 años ➔ 0 €)
            </button>
            <button type="button" onClick={() => setEdad(25)} className="btn-test">
              Adulto (25 años ➔ 1 €)
            </button>
            <button type="button" onClick={() => setEdad(65)} className="btn-test">
              Jubilado (65 años ➔ 0 €)
            </button>
            <button type="button" onClick={() => setEdad(80)} className="btn-test">
              Senior (80 años ➔ 0 €)
            </button>
          </div>
        </div>

        <div className="explicacion-reglas">
          <h4>Reglas aplicadas:</h4>
          <ul>
            <li><code>edad &gt;= 65</code>: 0 € (Jubilados)</li>
            <li><code>edad &gt;= 18</code>: 1 € (Adultos)</li>
            <li><code>edad &lt; 18</code>: 0 € (Menores gratuitos)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
