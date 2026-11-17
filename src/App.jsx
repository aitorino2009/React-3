import React, { useState } from 'react';
import './App.css';

// Importación de componentes de cada ejercicio
import ProgramaPrecio from './components/ProgramaPrecio';
import ProgramaVotacion from './components/ProgramaVotacion';
import ProgramaTemperatura from './components/ProgramaTemperatura';
import ProgramaListadoAlumnos from './components/ProgramaListadoAlumnos';
import EcoEnvios from './components/EcoEnvios';

export default function App() {
  const [tabActiva, setTabActiva] = useState('todos');

  return (
    <div className="app-container">
      {/* Cabecera principal */}
      <header className="app-header">
        <span className="header-badge">APOF • Desenvolupament Web en Entorn Client</span>
        <h1>React 3: Renderitzat i Renderitzat Condicional</h1>
        <p className="subtitulo">
          Resolució completa d&apos;exercicis pràctics i Desafiament GreenTech per a EcoShop Solutions
        </p>

        <div className="meta-info">
          <span><strong>Alumne:</strong> Aitor Portales Crespí</span>
          <span><strong>Centre:</strong> CC Sant Josep Obrer</span>
          <span>
            <strong>Repositori:</strong>{' '}
            <a
              href="https://github.com/aitorino2009/React-3.git"
              target="_blank"
              rel="noreferrer"
              className="meta-link"
            >
              github.com/aitorino2009/React-3
            </a>
          </span>
        </div>
      </header>

      {/* Navegación por pestañas para facilitar la corrección y visualización */}
      <nav className="nav-tabs" aria-label="Navegación de ejercicios">
        <button
          type="button"
          onClick={() => setTabActiva('todos')}
          className={`tab-btn ${tabActiva === 'todos' ? 'activo' : ''}`}
        >
          👁️ Veure Tots
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('4.1')}
          className={`tab-btn ${tabActiva === '4.1' ? 'activo' : ''}`}
        >
          4.1 Preu Bitllet
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('4.2')}
          className={`tab-btn ${tabActiva === '4.2' ? 'activo' : ''}`}
        >
          4.2 Màquina Votar
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('4.3')}
          className={`tab-btn ${tabActiva === '4.3' ? 'activo' : ''}`}
        >
          4.3 Temperatura
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('4.4')}
          className={`tab-btn ${tabActiva === '4.4' ? 'activo' : ''}`}
        >
          4.4 Dades Alumne
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('desafio')}
          className={`tab-btn destacado ${tabActiva === 'desafio' ? 'activo' : ''}`}
        >
          🌱 Desafiament EcoEnvíos
        </button>
        <button
          type="button"
          onClick={() => setTabActiva('teoria')}
          className={`tab-btn ${tabActiva === 'teoria' ? 'activo' : ''}`}
        >
          📖 Teoria i Respostes
        </button>
      </nav>

      {/* Grid de ejercicios */}
      <main className="ejercicios-grid">
        {/* Desafío React 3: EcoEnvios */}
        {(tabActiva === 'todos' || tabActiva === 'desafio') && (
          <section className="seccion-ejercicio">
            <div className="desafio-destacado-wrapper">
              <div className="desafio-cabecera-externa">
                <span className="badge-desafio">DESAFÍO REACT 3 • PROYECTO REAL</span>
                <h2>Validador de Descuentos &quot;GreenTech&quot;</h2>
                <p>
                  EcoShop Solutions: Startup de e-commerce sostenible con funciones puras y operadores ternarios limpios
                </p>
              </div>
              <EcoEnvios initialUserAge={29} initialPurchaseAmount={45} initialIsEcoMember={true} />
            </div>
          </section>
        )}

        {/* Ejercicio 4.1 */}
        {(tabActiva === 'todos' || tabActiva === '4.1') && (
          <section className="seccion-ejercicio">
            <ProgramaPrecio edadInicial={25} />
          </section>
        )}

        {/* Ejercicio 4.2 */}
        {(tabActiva === 'todos' || tabActiva === '4.2') && (
          <section className="seccion-ejercicio">
            <ProgramaVotacion edadInicial={99} />
          </section>
        )}

        {/* Ejercicio 4.3 */}
        {(tabActiva === 'todos' || tabActiva === '4.3') && (
          <section className="seccion-ejercicio">
            <ProgramaTemperatura tempInicial={15} />
          </section>
        )}

        {/* Ejercicio 4.4 */}
        {(tabActiva === 'todos' || tabActiva === '4.4') && (
          <section className="seccion-ejercicio">
            <ProgramaListadoAlumnos />
          </section>
        )}

        {/* Sección Teórica */}
        {(tabActiva === 'todos' || tabActiva === 'teoria') && (
          <section className="seccion-ejercicio">
            <article className="teoria-container">
              <h2>4. Fonaments Teòrics: Renderitzat i Virtual DOM</h2>

              <div className="teoria-tarjeta">
                <h4>Què és el Renderitzat a React?</h4>
                <p>
                  El renderitzat és el procés mitjançant el qual el motor de React fa un recorregut pel
                  <strong> Virtual DOM (VDOM)</strong> i recopila informació referent a l&apos;estat, l&apos;estructura
                  i els canvis desitjats. Compara les dades recopilades amb el DOM real del navegador mitjançant
                  un algorisme de reconciliació (diffing) i aplica exclusivament els canvis mínims necessaris.
                </p>
              </div>

              <div className="teoria-tarjeta">
                <h4>Compara: Web Clàssica vs React (VDOM)</h4>
                <ul>
                  <li>
                    <strong>Web tradicional:</strong> Davant qualsevol esdeveniment o enviament de formulari,
                    es recarregava tota la pàgina web, podent perdre dades i generant parpelleigs.
                  </li>
                  <li>
                    <strong>React amb VDOM:</strong> Només s&apos;actualitza el component concret afectat per
                    l&apos;esdeveniment. La pàgina no es recarrega i l&apos;experiència d&apos;usuari és fluida i
                    eficient.
                  </li>
                </ul>
              </div>

              <div className="teoria-tarjeta">
                <h4>4.1 Renderitzat Condicional amb Operador Ternari</h4>
                <p>
                  El renderitzat condicional permet mostrar diferents elements o components segons una
                  expressió booleana o estat. La sintaxi canònica a React és:
                </p>
                <pre className="codigo-bloque">
{`{condicion ? <ComponenteSiTrue /> : <ComponenteSiFalse />}`}
                </pre>
                <p>
                  Quan s&apos;han de renderitzar múltiples elements, s&apos;embolcallen entre parèntesis <code>(...)</code>{' '}
                  i fragments <code>&lt;&gt;...&lt;/&gt;</code>.
                </p>
              </div>

              <div className="teoria-tarjeta">
                <h4>Comprovació Exercici 4.4: Canvi de ID</h4>
                <p>
                  En canviar la propietat <code>id</code> de l&apos;objecte <code>Alumno</code>:
                </p>
                <ul>
                  <li>
                    Si <code>id === 1</code>: Es compleix la condició ternària i es renderitza el component{' '}
                    <code>&lt;Detalles /&gt;</code>, el qual només imprimeix un element de llista amb el nom:{' '}
                    <code>&lt;li&gt;&lt;b&gt;Ana&lt;/b&gt;&lt;/li&gt;</code>.
                  </li>
                  <li>
                    Si <code>id !== 1</code> (per exemple <code>id: 2</code>): La condició avalua a fals i es
                    renderitza el component <code>&lt;Completo /&gt;</code>, mostrant tota la informació:{' '}
                    <code>&lt;p&gt;2 - &lt;b&gt;Ana&lt;/b&gt; - &lt;b&gt;Alvarez&lt;/b&gt;&lt;/p&gt;</code>.
                  </li>
                </ul>
              </div>
            </article>
          </section>
        )}
      </main>

      {/* Footer corporativo */}
      <footer className="app-footer">
        <p>
          Projecte Desenvolupat per <strong>Aitor Portales Crespí</strong> • Pràctica <strong>React 3</strong>
        </p>
        <div className="footer-links">
          <a href="https://github.com/aitorino2009/React-3.git" target="_blank" rel="noreferrer">
            Repositori GitHub
          </a>
          <span>•</span>
          <span>Bones Pràctiques React 19 &amp; Vite</span>
          <span>•</span>
          <span>Arquitectura Funcional Pura</span>
        </div>
      </footer>
    </div>
  );
}
