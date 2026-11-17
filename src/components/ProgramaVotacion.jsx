import React, { useState } from 'react';

/**
 * Ejercicio 4.2: Máquina para votar con validación de edad
 * Requisitos:
 * a) Ejecutar el código base.
 * b) Añadir código para que la validación devuelva "false" en caso de valor > 100.
 */
export default function ProgramaVotacion({ edadInicial = 99 }) {
  // Constante inicial de prueba (99 según el enunciado)
  const [edadInput, setEdadInput] = useState(edadInicial);

  // a) y b) Validación modificada: si es NaN o > 100 devuelve false, de lo contrario devuelve el número
  const validar = (dato) => {
    const valor = Number(dato);
    // Requisito b): Añadido "valor > 100" a la condición
    return (isNaN(valor) || valor > 100 || valor < 0) ? false : valor;
  };

  // Función para comprobar si es mayor de edad
  const comprobar = (edad) => (edad < 18 ? false : true);

  // Función orquestadora
  const inicio = (dato) => {
    const edad = validar(dato);
    // Si edad es false (por ser > 100, inválido o menor de 0), no puede votar
    const mayor_edad = (edad !== false) && comprobar(edad);
    const mensaje = mayor_edad ? 'Mayor de edad. Puede votar' : 'No puede votar';
    return mensaje;
  };

  return (
    <div className="card-ejercicio">
      <div className="card-header">
        <span className="badge">Ejercicio 4.2</span>
        <h3>Máquina para votar</h3>
      </div>

      <div className="card-body">
        {/* Resultado con el valor actual */}
        <div className="resultado-box">
          <p className="resultado-principal">
            <strong>Valor evaluado:</strong> {edadInput} <br />
            <strong>Resultado:</strong>{' '}
            <span className={inicio(edadInput).includes('Puede votar') ? 'badge-exito' : 'badge-alerta'}>
              {inicio(edadInput)}
            </span>
          </p>
        </div>

        {/* Controles para probar el comportamiento */}
        <div className="controles-prueba">
          <label htmlFor="edad-input-42">
            <strong>Probar otra edad: </strong>
          </label>
          <input
            id="edad-input-42"
            type="number"
            value={edadInput}
            onChange={(e) => setEdadInput(e.target.value)}
            className="input-estilizado"
          />

          <div className="botones-rapidos">
            <button type="button" onClick={() => setEdadInput(99)} className="btn-test">
              Edad original (99 años ➔ Vota)
            </button>
            <button type="button" onClick={() => setEdadInput(101)} className="btn-test">
              Mayor de 100 (101 años ➔ false / No vota)
            </button>
            <button type="button" onClick={() => setEdadInput(18)} className="btn-test">
              Límite inferior (18 años ➔ Vota)
            </button>
            <button type="button" onClick={() => setEdadInput(17)} className="btn-test">
              Menor (17 años ➔ No vota)
            </button>
          </div>
        </div>

        <div className="explicacion-reglas">
          <h4>Modificación realizada para el requisito b):</h4>
          <pre className="codigo-bloque">
{`const validar = (dato) => {
  const valor = Number(dato);
  // Se añade condición (valor > 100) para retornar false si supera 100 años
  return (isNaN(valor) || valor > 100) ? false : valor;
};`}
          </pre>
        </div>
      </div>
    </div>
  );
}
