/**
 * =========================================================================
 * FUNCIONES PURAS DE CÁLCULO - DESAFÍO REACT 3 (GREEN TECH E-COMMERCE)
 * Startup: EcoShop Solutions
 * =========================================================================
 */

/**
 * Evalúa las reglas de negocio de EcoShop Solutions utilizando
 * operadores condicionales ternarios obligatorios:
 *
 * 1. Envío Gratuito: userAge < 18 || purchaseAmount > 50 -> "¡Envío Gratuito! (0€)"
 * 2. Descuento Membresía: isEcoMember === true && 18 <= userAge <= 65 -> "Tarifa Eco: 1.50€"
 * 3. Tarifa Estándar: Cualquier otro caso -> "Tarifa Estándar: 4.95€"
 */
export const calcularTarifaEnvio = (age, amount, isMember) => {
  const edad = Number(age);
  const importe = Number(amount);
  const miembro = Boolean(isMember);

  // Operadores condicionales ternarios
  return (edad < 18 || importe > 50)
    ? '¡Envío Gratuito! (0€)'
    : (miembro && edad >= 18 && edad <= 65)
      ? 'Tarifa Eco: 1.50€'
      : 'Tarifa Estándar: 4.95€';
};

/**
 * Función pura auxiliar que extrae el desglose económico para la factura del carrito
 */
export const obtenerDesgloseTarifa = (age, amount, isMember) => {
  const edad = Number(age);
  const importe = Number(amount);
  const miembro = Boolean(isMember);

  const textoTarifa = calcularTarifaEnvio(edad, importe, miembro);

  const costeEnvio = textoTarifa.startsWith('¡Envío Gratuito!')
    ? 0
    : textoTarifa.startsWith('Tarifa Eco')
      ? 1.50
      : 4.95;

  const motivo = (edad < 18)
    ? 'Beneficio Joven: Menor de 18 años'
    : (importe > 50)
      ? 'Supera importe mínimo de 50€ para envío libre de emisiones'
      : (miembro && edad >= 18 && edad <= 65)
        ? 'Socio del Club Verde (Franja 18 - 65 años)'
        : (miembro && edad > 65)
          ? 'Membresía no aplicable fuera del rango 18-65 años'
          : 'Usuario estándar sin suscripción';

  return {
    textoTarifa,
    costeEnvio,
    totalPedido: +(importe + costeEnvio).toFixed(2),
    motivo
  };
};
