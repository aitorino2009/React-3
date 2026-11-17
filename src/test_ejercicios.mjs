import test from 'node:test';
import assert from 'node:assert/strict';

import { calcularTarifaEnvio, obtenerDesgloseTarifa } from './utils/logicaEnvios.js';

/**
 * ============================================================================
 * SUITE DE PRUEBAS AUTOMATIZADAS - REACT 3
 * Verifica la lógica de negocio de todos los ejercicios y el desafío GreenTech
 * ============================================================================
 */

test('Ejercicio 4.1: Cálculo de tarifas de billete de autobús', () => {
  const comprobar = (dato) => {
    const edad = Number(dato);
    return (edad >= 65) ? 0 : (edad >= 18) ? 1 : 0;
  };

  // a) Si la edad es >= 65 años, precio es 0 €
  assert.equal(comprobar(65), 0, 'Edad 65 debe ser 0 €');
  assert.equal(comprobar(75), 0, 'Edad 75 debe ser 0 €');

  // b) Si la edad es >= 18 años, precio es 1 €
  assert.equal(comprobar(18), 1, 'Edad 18 debe ser 1 €');
  assert.equal(comprobar(25), 1, 'Edad 25 debe ser 1 €');
  assert.equal(comprobar(64), 1, 'Edad 64 debe ser 1 €');

  // c) Menores de edad (< 18) no pagan (0 €)
  assert.equal(comprobar(17), 0, 'Edad 17 debe ser 0 €');
  assert.equal(comprobar(5), 0, 'Edad 5 debe ser 0 €');
});

test('Ejercicio 4.2: Máquina de votar y validación de edad máxima 100 años', () => {
  const validar = (dato) => {
    const valor = Number(dato);
    return (isNaN(valor) || valor > 100 || valor < 0) ? false : valor;
  };

  const comprobar = (edad) => (edad < 18 ? false : true);

  const inicio = (dato) => {
    const edad = validar(dato);
    const mayor_edad = (edad !== false) && comprobar(edad);
    return mayor_edad ? 'Mayor de edad. Puede votar' : 'No puede votar';
  };

  // a) Caso inicial con edad 99
  assert.equal(validar(99), 99);
  assert.equal(inicio(99), 'Mayor de edad. Puede votar');

  // b) Validación devuelve false si valor > 100
  assert.equal(validar(101), false, 'Edad 101 debe devolver false');
  assert.equal(inicio(101), 'No puede votar', 'Edad 101 no debe poder votar');

  // Caso menor de edad
  assert.equal(validar(17), 17);
  assert.equal(inicio(17), 'No puede votar');

  // Caso borde 100
  assert.equal(validar(100), 100);
  assert.equal(inicio(100), 'Mayor de edad. Puede votar');
});

test('Ejercicio 4.3: Clasificación de rangos de temperatura', () => {
  const clasificarTemperatura = (temp) => {
    return temp >= 0 && temp < 10
      ? 'Molt fred'
      : temp >= 10 && temp < 20
      ? 'Temperatura mitjana'
      : temp >= 20 && temp <= 30
      ? 'Calor'
      : temp < 0
      ? 'Molt fred (Sota zero)'
      : 'Calor extrema (>30ºC)';
  };

  // 0 a 10ºC -> 'Molt fred'
  assert.equal(clasificarTemperatura(0), 'Molt fred');
  assert.equal(clasificarTemperatura(5), 'Molt fred');
  assert.equal(clasificarTemperatura(9.9), 'Molt fred');

  // 10 a 20ºC -> 'Temperatura mitjana'
  assert.equal(clasificarTemperatura(10), 'Temperatura mitjana');
  assert.equal(clasificarTemperatura(15), 'Temperatura mitjana');
  assert.equal(clasificarTemperatura(19.9), 'Temperatura mitjana');

  // 20 a 30ºC -> 'Calor'
  assert.equal(clasificarTemperatura(20), 'Calor');
  assert.equal(clasificarTemperatura(25), 'Calor');
  assert.equal(clasificarTemperatura(30), 'Calor');
});

test('Ejercicio 4.4: Lógica de selección según id de alumno', () => {
  const evaluarVista = (id) => (id === 1 ? 'Detalles' : 'Completo');

  assert.equal(evaluarVista(1), 'Detalles', 'ID 1 debe renderizar Detalles');
  assert.equal(evaluarVista(2), 'Completo', 'ID 2 debe renderizar Completo');
  assert.equal(evaluarVista(99), 'Completo', 'Cualquier otro ID debe renderizar Completo');
});

test('Desafío React 3: Validador GreenTech para EcoShop Solutions', () => {
  // Regla 1: Menor de 18 años -> Envío Gratuito
  assert.equal(
    calcularTarifaEnvio(16, 20, false),
    '¡Envío Gratuito! (0€)',
    'Menor de 18 debe tener envío gratuito sin importar importe o membresía'
  );

  // Regla 1: Compra superior a 50€ -> Envío Gratuito
  assert.equal(
    calcularTarifaEnvio(35, 60, false),
    '¡Envío Gratuito! (0€)',
    'Compra > 50€ debe tener envío gratuito para cualquier usuario'
  );
  assert.equal(
    calcularTarifaEnvio(40, 50.01, true),
    '¡Envío Gratuito! (0€)',
    'Compra de 50.01€ debe ser envío gratuito'
  );

  // Regla 2: Miembro club verde (isEcoMember === true) y edad entre 18 y 65 (inclusive)
  assert.equal(
    calcularTarifaEnvio(29, 45, true),
    'Tarifa Eco: 1.50€',
    'Socio de 29 años con compra de 45€ aplica Tarifa Eco: 1.50€'
  );
  assert.equal(
    calcularTarifaEnvio(18, 30, true),
    'Tarifa Eco: 1.50€',
    'Límite inferior 18 años debe aplicar tarifa eco'
  );
  assert.equal(
    calcularTarifaEnvio(65, 30, true),
    'Tarifa Eco: 1.50€',
    'Límite superior 65 años debe aplicar tarifa eco'
  );

  // Regla 3: Tarifa estándar 4.95€ para cualquier otro caso
  assert.equal(
    calcularTarifaEnvio(30, 40, false),
    'Tarifa Estándar: 4.95€',
    'Usuario adulto no socio con compra <= 50€ paga estándar'
  );
  assert.equal(
    calcularTarifaEnvio(70, 30, true),
    'Tarifa Estándar: 4.95€',
    'Socio mayor de 65 años con compra <= 50€ no entra en tarifa eco, pasa a estándar'
  );

  // Prueba de desglose económico
  const desgloseEco = obtenerDesgloseTarifa(29, 45, true);
  assert.equal(desgloseEco.costeEnvio, 1.50);
  assert.equal(desgloseEco.totalPedido, 46.50);

  const desgloseGratis = obtenerDesgloseTarifa(16, 20, false);
  assert.equal(desgloseGratis.costeEnvio, 0);
  assert.equal(desgloseGratis.totalPedido, 20);
});
