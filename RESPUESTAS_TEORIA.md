# Respuestas Teóricas y Análisis Técnico - React 3

**Módulo:** Desarrollo Web en Entorno Cliente (APOF)  
**Alumno:** Aitor Portales Crespí  
**Centro:** CC Sant Josep Obrer  

---

## 1. El Proceso de Renderizado en React (Apartado 4)

### 1.1 ¿Qué es el renderizado en React?
El renderizado es el proceso mediante el cual el motor interno de React:
1. Recorre el árbol de componentes y evalúa sus funciones y estados actuales.
2. Construye una representación ligera en memoria de la interfaz de usuario denominada **Virtual DOM (VDOM)**.
3. Compara el nuevo Virtual DOM con la versión anterior mediante un algoritmo heurístico de reconciliación (**Diffing Algorithm**).
4. Identifica las diferencias exactas y actualiza de forma quirúrgica únicamente los nodos necesarios del **DOM real del navegador** (fase de *Commit*).

### 1.2 Diferencia entre el DOM Real y el Virtual DOM (VDOM)
- **DOM Real (Document Object Model):** Estructura jerárquica de nodos creada por el navegador. Manipular directamente el DOM real es una operación computacionalmente costosa porque cada modificación suele desencadenar recalculación de estilos (*Recalculate Style*), maquetación geométrica (*Reflow/Layout*) y repintado de píxeles (*Repaint*).
- **Virtual DOM (VDOM):** Copia abstracta y ligera en memoria JavaScript. React puede crear y destruir miles de nodos virtuales en milisegundos sin coste gráfico para la GPU ni para el motor de renderizado del navegador.

### 1.3 Comparativa: Páginas Dinámicas Tradicionales vs React
| Aspecto | Web Tradicional (Clásica) | Aplicación React (VDOM) |
|---|---|---|
| **Respuesta a eventos** | Recarga completa de la página (*Full page reload*) o manipulación imperativa manual. | Actualización reactiva y puntual del componente afectado. |
| **Persistencia de estado** | Riesgo de pérdida de datos de formularios y scroll en cada recarga. | Los estados se mantienen intactos; sin parpadeos de interfaz. |
| **Rendimiento** | Alto coste de renderizado y latencia perceptible para el usuario. | Óptimo: solo muta el nodo exacto que ha cambiado en el DOM. |
| **Experiencia de usuario (UX)** | Interfaz discontinua y lenta. | Fluida, instantánea y de tipo Single Page Application (SPA). |

### 1.4 La importancia de evitar anidamientos excesivos
Un anidamiento jerárquico excesivo de componentes provoca:
1. Árboles de Virtual DOM muy profundos que consumen mayor memoria RAM.
2. Tiempos de reconciliación más lentos durante el recorrido del árbol.
3. Dificultad para mantener y depurar el código (*Prop Drilling*).
4. Sobrecarga innecesaria de renders en componentes descendientes cuando un ancestro actualiza su estado.

---

## 2. Renderizado Condicional en React (Apartado 4.1)

### 2.1 Definición
El renderizado condicional permite mostrar u ocultar componentes y bloques JSX en función del estado, props o variables evaluadas en tiempo de ejecución.

### 2.2 Sintaxis con Operador Ternario
El operador ternario es la estructura preferida en JSX porque es una **expresión** que devuelve un valor evaluable directamente dentro de las llaves `{ }`:
```jsx
{condicion ? <ComponenteVerdadero /> : <ComponenteFalso />}
```

### 2.3 Renderizado de múltiples elementos
Cuando el bloque a renderizar contiene más de un elemento, React exige:
1. Envolver los elementos en paréntesis `( ... )` para evitar problemas de interpretación sintáctica.
2. Agruparlos bajo un único nodo padre o un fragmento vacío `<> ... </>` para respetar la regla de raíz única de JSX:
```jsx
{condicion ? (
  <div>
    <p>Hola!</p>
    <p>Varios elementos a renderizar</p>
  </div>
) : (
  <div>
    <h3>Saludos despedida</h3>
    <p>Adiós!</p>
  </div>
)}
```

---

## 3. Resolución y Comprobación de Ejercicios (Apartado 4.2)

### 3.1 Ejercicio 4.1: Precio del billete de autobús
**Requerimientos aplicados:**
- Si la edad es `>= 65`: precio `0 €` (Jubilados gratuitos).
- Si la edad es `>= 18`: precio `1 €` (Adultos).
- Si la edad es `< 18`: precio `0 €` (Menores no pagan).

**Lógica implementada:**
```javascript
function comprobar(dato) {
  const edad = Number(dato);
  const resultado = (edad >= 65) ? 0 : (edad >= 18) ? 1 : 0;
  return resultado;
}
```

### 3.2 Ejercicio 4.2: Máquina para votar y validación de edad
**Requerimientos aplicados:**
- Ejecutar el código base con `edad = 99`.
- Modificar `validar` para devolver `false` si el valor supera 100 años (`valor > 100`).

**Lógica implementada:**
```javascript
const validar = (dato) => {
  const valor = Number(dato);
  // Requisito b: retorna false si no es número o si es mayor de 100 o negativo
  return (isNaN(valor) || valor > 100 || valor < 0) ? false : valor;
};
```
**Comportamiento verificado:**
- Para `edad = 99`: La validación retorna `99` (true lógico), es mayor de 18 y el mensaje es `"Mayor de edad. Puede votar"`.
- Para `edad = 101`: La validación retorna `false`, provocando que `mayor_edad` sea `false` y el mensaje resulte en `"No puede votar"`.

### 3.3 Ejercicio 4.3: Clasificador de Temperatura con Funciones
**Requerimientos aplicados:**
- Temperatura entre 0 y 10ºC ➔ `'Molt fred'`
- Temperatura entre 10 y 20ºC ➔ `'Temperatura mitjana'`
- Temperatura entre 20 y 30ºC ➔ `'Calor'`

**Lógica implementada con operadores ternarios:**
```javascript
const clasificarTemperatura = (temp) => {
  return (temp >= 0 && temp < 10)
    ? 'Molt fred'
    : (temp >= 10 && temp < 20)
      ? 'Temperatura mitjana'
      : (temp >= 20 && temp <= 30)
        ? 'Calor'
        : (temp < 0)
          ? 'Molt fred (Sota zero)'
          : 'Calor extrema (>30ºC)';
};
```

### 3.4 Ejercicio 4.4: Comprobación del cambio de ID en `Alumno`
**Pregunta:** *¿Qué es lo que se renderiza cuando se cambia el valor de `id` manualmente, se guarda el código y se vuelve a ejecutar?*

**Análisis técnico paso a paso:**
En el componente `ProgramaListadoAlumnos`, la función `VerDatos` evalúa la propiedad `id` del objeto `datos`:
```javascript
const resultado = (datos.id === 1) ? <Detalles valor={datos} /> : <Completo valor={datos} />;
```

1. **Cuando `id: 1`:**
   - La condición `datos.id === 1` es `true`.
   - React renderiza el componente `<Detalles valor={datos} />`.
   - El DOM final recibe únicamente un elemento de lista con el nombre:
     ```html
     <li><b>Ana</b></li>
     ```
   - El apellido y el id no se imprimen en pantalla.

2. **Cuando cambiamos manualmente el id a `2` (o cualquier valor distinto de 1):**
   - La condición `datos.id === 1` es `false`.
   - React renderiza el componente `<Completo valor={datos} />`.
   - El DOM final recibe un párrafo con todos los datos detallados:
     ```html
     <p>2 - <b>Ana</b> - <b>Alvarez</b></p>
     ```

**Conclusión:** React detecta a través del Virtual DOM que la rama del operador ternario ha cambiado de `<Detalles />` a `<Completo />`, desmonta el nodo `<li>` y monta en su lugar el nodo `<p>` con la información completa, demostrando la reactividad y el renderizado condicional granular.

---

## 4. Desafío React 3: Validador "GreenTech" para EcoShop Solutions

### 4.1 Principio de Funciones Puras en React
Las funciones puras son aquellas que:
1. Dados los mismos argumentos de entrada, devuelven **siempre el mismo resultado**.
2. **No producen efectos secundarios** (*no side-effects*): no alteran variables externas, no realizan peticiones de red ni mutan el estado global.

En nuestro proyecto, `calcularTarifaEnvio` y `obtenerDesgloseTarifa` son funciones puras exportadas de forma modular, permitiendo ser testeadas con un 100% de fiabilidad.

### 4.2 Matriz de Decisión con Operadores Ternarios
```javascript
export const calcularTarifaEnvio = (age, amount, isMember) => {
  const edad = Number(age);
  const importe = Number(amount);
  const miembro = Boolean(isMember);

  return (edad < 18 || importe > 50)
    ? '¡Envío Gratuito! (0€)'
    : (miembro && edad >= 18 && edad <= 65)
      ? 'Tarifa Eco: 1.50€'
      : 'Tarifa Estándar: 4.95€';
};
```

### 4.3 Casos de Negocio Comprobados
| Caso | Edad (`userAge`) | Importe (`purchaseAmount`) | Miembro (`isEcoMember`) | Tarifa Resultante | Regla Aplicada |
|---|---|---|---|---|---|
| **Menor de edad** | 16 | 20 € | false | `¡Envío Gratuito! (0€)` | Regla 1 (`edad < 18`) |
| **Compra Grande** | 35 | 60 € | false | `¡Envío Gratuito! (0€)` | Regla 1 (`importe > 50`) |
| **Socio Club Verde** | 29 | 45 € | true | `Tarifa Eco: 1.50€` | Regla 2 (`miembro && 18 <= edad <= 65`) |
| **Límite Socio 18a** | 18 | 30 € | true | `Tarifa Eco: 1.50€` | Regla 2 (borde inferior inclusivo) |
| **Límite Socio 65a** | 65 | 30 € | true | `Tarifa Eco: 1.50€` | Regla 2 (borde superior inclusivo) |
| **Cliente Estándar** | 30 | 40 € | false | `Tarifa Estándar: 4.95€` | Regla 3 (no cumple regla 1 ni 2) |
| **Socio Senior** | 70 | 30 € | true | `Tarifa Estándar: 4.95€` | Regla 3 (edad > 65 queda fuera de tarifa eco) |
