import React, { useState } from 'react';

/**
 * Ejercicio 4.4: Renderizado condicional de componentes según ID del alumno
 * 
 * Pregunta del ejercicio:
 * "Comprovar que és el que es renderitza quan es canvia el valor de id manualment,
 *  es guarda (save) el codi i es torna executar l'exercici."
 * 
 * Conclusión técnica:
 * - Si Alumno.id === 1: Se renderiza el componente <Detalles />, que solo muestra <li><b>{nombre}</b></li>.
 * - Si Alumno.id !== 1 (ej. id: 2): Se renderiza el componente <Completo />, que muestra <p>{id} - <b>{nombre}</b> - <b>{apellido}</b></p>.
 */
export default function ProgramaListadoAlumnos({ alumnoInicial = { id: 1, nombre: 'Ana', apellido: 'Alvarez' } }) {
  // Estado para permitir comprobar dinámicamente el cambio de ID además del estático
  const [alumno, setAlumno] = useState(alumnoInicial);

  // Subcomponente 1: Vista reducida (solo nombre en un <li>)
  const Detalles = (props) => {
    const { valor } = props;
    return (
      <li className="item-detalle">
        <b>{valor.nombre}</b> <span className="tipo-vista">(Vista reducida: Detalles)</span>
      </li>
    );
  };

  // Subcomponente 2: Vista completa (id, nombre y apellido en un <p>)
  const Completo = (props) => {
    const { valor } = props;
    return (
      <p className="item-completo">
        {valor.id} - <b>{valor.nombre}</b> - <b>{valor.apellido}</b>{' '}
        <span className="tipo-vista">(Vista completa: Completo)</span>
      </p>
    );
  };

  // Subcomponente 3: Selector condicional con operador ternario
  const VerDatos = (props) => {
    const { datos } = props;
    const resultado =
      datos.id === 1 ? <Detalles valor={datos} /> : <Completo valor={datos} />;
    return resultado;
  };

  return (
    <div className="card-ejercicio">
      <div className="card-header">
        <span className="badge">Ejercicio 4.4</span>
        <h3>Datos Alumno</h3>
      </div>

      <div className="card-body">
        {/* Renderizado idéntico al enunciado */}
        <div className="resultado-box">
          <h4>Renderizado en pantalla:</h4>
          <ul>
            <VerDatos datos={alumno} />
          </ul>
        </div>

        {/* Controles para probar qué ocurre al cambiar el ID */}
        <div className="controles-prueba">
          <label htmlFor="id-alumno-input">
            <strong>Cambiar ID del alumno (ID actual: {alumno.id}): </strong>
          </label>
          <input
            id="id-alumno-input"
            type="number"
            value={alumno.id}
            onChange={(e) => setAlumno({ ...alumno, id: Number(e.target.value) })}
            className="input-estilizado"
          />

          <div className="botones-rapidos">
            <button
              type="button"
              onClick={() => setAlumno({ ...alumno, id: 1 })}
              className={`btn-test ${alumno.id === 1 ? 'btn-activo' : ''}`}
            >
              Fijar id = 1 (Renderiza &lt;Detalles&gt;)
            </button>
            <button
              type="button"
              onClick={() => setAlumno({ ...alumno, id: 2 })}
              className={`btn-test ${alumno.id !== 1 ? 'btn-activo' : ''}`}
            >
              Fijar id = 2 (Renderiza &lt;Completo&gt;)
            </button>
          </div>
        </div>

        {/* Explicación de la comprobación requerida */}
        <div className="explicacion-reglas">
          <h4>Comprobación del comportamiento:</h4>
          <p>
            Al cambiar el valor de <code>id</code>:
          </p>
          <ul>
            <li>
              <strong>Cuando <code>id === 1</code>:</strong> El operador ternario <code>datos.id === 1 ? &lt;Detalles /&gt; : &lt;Completo /&gt;</code> evalúa a <em>true</em> y React renderiza el componente <code>&lt;Detalles valor={'{datos}'} /&gt;</code>, mostrando únicamente la etiqueta <code>&lt;li&gt;&lt;b&gt;Ana&lt;/b&gt;&lt;/li&gt;</code>.
            </li>
            <li>
              <strong>Cuando <code>id !== 1</code> (ej. 2):</strong> La condición evalúa a <em>false</em> y React renderiza el componente alternativo <code>&lt;Completo valor={'{datos}'} /&gt;</code>, mostrando todos los campos: <code>2 - Ana - Alvarez</code> dentro de un párrafo.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
