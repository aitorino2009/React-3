# Respostes Teòriques i Anàlisi Tècnic - React 3

**Mòdul:** Desenvolupament Web en Entorn Client (APOF)  
**Alumne:** Aitor Portales Crespí  
**Centre:** CC Sant Josep Obrer  

---

## 1. El Procés de Renderitzat a React (Apartat 4)

### 1.1 Què és el renderitzat a React?
El renderitzat és el procés mitjançant el qual el motor de React:
1. Fa un recorregut per l'arbre de components i avalua els seus estats i propietats (*props*).
2. Construeix una representació lleugera en memòria de la interfície d'usuari anomenada **Virtual DOM (VDOM)**.
3. Compara el nou Virtual DOM amb la versió anterior mitjançant un algorisme heurístic de reconciliació (**Diffing Algorithm**).
4. Identifica les diferències exactes i actualitza exclusivament els nodes necessaris del **DOM real del navegador** (fase de *Commit*).

### 1.2 Diferència entre el DOM Real i el Virtual DOM (VDOM)
- **DOM Real (Document Object Model):** Estructura jeràrquica de nodes creada pel navegador. Manipular directament el DOM real és una operació costosa perquè cada modificació sol comportar recàlcul d'estils (*Recalculate Style*), maquetació geomètrica (*Reflow/Layout*) i repintat de píxels (*Repaint*).
- **Virtual DOM (VDOM):** Còpia abstracta i molt lleugera en memòria JavaScript. React pot crear i comparar milers de nodes virtuals en mil·lisegons sense cost gràfic per a la GPU ni per al motor de renderitzat del navegador.

### 1.3 Comparativa: Pàgines Dinàmiques Tradicionals vs React
| Aspecte | Web Tradicional (Clàssica) | Aplicació React (VDOM) |
|---|---|---|
| **Resposta a esdeveniments** | Recàrrega completa de la pàgina o manipulació imperativa manual. | Actualització reactiva i puntual del component afectat. |
| **Persistència d'estat** | Risc de pèrdua de dades de formularis i posició de scroll en cada recàrrega. | Els estats es mantenen intactes; sense parpelleigs d'interfície. |
| **Rendiment** | Alt cost de renderitzat i latència perceptible per a l'usuari. | Òptim: només muta el node exacte que ha canviat al DOM. |
| **Experiència d'usuari (UX)** | Interfície discontínua i lenta. | Fluida, instantània i tipus Single Page Application (SPA). |

### 1.4 Per què cal evitar els anidaments excessius?
Un anidament jeràrquic excessiu de components provoca:
1. Arbres de Virtual DOM massa profunds que consumeixen més memòria RAM.
2. Temps de reconciliació més llargs durant el recorregut de l'arbre.
3. Dificultat per mantenir i depurar el codi (*Prop Drilling*).
4. Sobrecàrrega innecessària de renders en components descendents quan un ancestre actualitza el seu estat.

---

## 2. Renderitzat Condicional a React (Apartat 4.1)

### 2.1 Definició
El renderitzat condicional consisteix a imprimir o ocultar certa informació, elements o components si es compleix una condició o expressió booleana determinada.

### 2.2 Sintaxi amb Operador Ternari
L'operador ternari és l'eina principal en JSX perquè és una **expressió** que retorna un valor directament avaluable dins de claus `{ }`:
```jsx
{condicion ? <ComponenteSiTrue /> : <ComponenteSiFalse />}
```

### 2.3 Renderitzat de múltiples elements
Quan hi ha més d'un element per renderitzar, React exigeix:
1. Embolcallar els elements entre parèntesis `( ... )`.
2. Agrupar-los sota un únic node pare o fragment buit `<> ... </>`:
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

## 3. Resolució i Comprovació dels Exercicis (Apartat 4.2)

### 3.1 Exercici 4.1: Preu del bitllet d'autobús
**Requeriments aplicats:**
- Si l'edat és `>= 65`: preu `0 €` (Jubilats gratuïts).
- Si l'edat és `>= 18`: preu `1 €` (Adults).
- Si l'edat és `< 18`: preu `0 €` (Menors no paguen).

**Lògica implementada:**
```javascript
function comprobar(dato) {
  const edad = Number(dato);
  const resultado = (edad >= 65) ? 0 : (edad >= 18) ? 1 : 0;
  return resultado;
}
```

### 3.2 Exercici 4.2: Màquina per votar i validació d'edat
**Requeriments aplicats:**
- Executar el codi base amb `edad = 99`.
- Afegir codi perquè la funció `validar` retorni `false` en cas que `valor > 100`.

**Lògica implementada:**
```javascript
const validar = (dato) => {
  const valor = Number(dato);
  return (isNaN(valor) || valor > 100 || valor < 0) ? false : valor;
};
```
**Comportament verificat:**
- Per a `edad = 99`: La validació retorna `99`, és major de 18 i el missatge és `"Mayor de edad. Puede votar"`.
- Per a `edad = 101`: La validació retorna `false`, provocant que `mayor_edad` sigui `false` i el missatge resulti en `"No puede votar"`.

### 3.3 Exercici 4.3: Sensor de Temperatura amb Funcions
**Requeriments aplicats:**
- Valor temp. entre 0 i 10ºC ➔ `'Molt fred'`
- Valor temp. entre 10 i 20ºC ➔ `'Temperatura mitjana'`
- Valor temp. entre 20 i 30ºC ➔ `'Calor'`

**Lògica implementada amb operadors ternaris:**
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

### 3.4 Exercici 4.4: Comprovació del canvi de ID a `Alumno`
**Pregunta:** *Què és el que es renderitza quan es canvia el valor d'`id` manualment, es guarda el codi i es torna executar l'exercici?*

**Anàlisi tècnica pas a pas:**
Al component `ProgramaListadoAlumnos`, la funció `VerDatos` avalua la propietat `id` de l'objecte `datos`:
```javascript
const resultado = (datos.id === 1) ? <Detalles valor={datos} /> : <Completo valor={datos} />;
```

1. **Quan `id: 1`:**
   - La condició `datos.id === 1` avalua a `true`.
   - React renderitza el component `<Detalles valor={datos} />`.
   - El DOM final rep exclusivament un element de llista amb el nom:
     ```html
     <li><b>Ana</b></li>
     ```
   - El cognom i l'identificador no es mostren a pantalla.

2. **Quan canviem manualment l'id a `2` (o qualsevol altre valor diferent d'1):**
   - La condició `datos.id === 1` avalua a `false`.
   - React renderitza el component alternatiu `<Completo valor={datos} />`.
   - El DOM final rep un paràgraf amb tota la informació:
     ```html
     <p>2 - <b>Ana</b> - <b>Alvarez</b></p>
     ```

**Conclusió:** React detecta mitjançant el Virtual DOM que la branca de l'operador ternari ha canviat de `<Detalles />` a `<Completo />`, desmunta el node `<li>` i munta en el seu lloc el node `<p>` amb la informació completa, demostrant la reactivitat i el renderitzat condicional granular.

---

## 4. Desafiament React 3: Validador "GreenTech" per a EcoShop Solutions

### 4.1 Principi de Funcions Pures
Les funcions pures són aquelles que:
1. Donats els mateixos arguments d'entrada, retornen **sempre el mateix resultat**.
2. **No produeixen efectes secundaris**: no alteren variables externes, no realitzen peticions de xarxa ni muten l'estat global.

Al nostre projecte, `calcularTarifaEnvio` i `obtenerDesgloseTarifa` són funcions pures exportades de forma modular, permetent ser testejades amb un 100% de fiabilitat.

### 4.2 Matriu de Decisió amb Operadors Ternaris
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

### 4.3 Casos de Negoci Verificats
| Cas | Edat (`userAge`) | Import (`purchaseAmount`) | Membre (`isEcoMember`) | Tarifa Resultant | Regla Aplicada |
|---|---|---|---|---|---|
| **Menor d'edat** | 16 | 20 € | false | `¡Envío Gratuito! (0€)` | Regla 1 (`edat < 18`) |
| **Compra Gran** | 35 | 60 € | false | `¡Envío Gratuito! (0€)` | Regla 1 (`import > 50`) |
| **Soci Club Verd** | 29 | 45 € | true | `Tarifa Eco: 1.50€` | Regla 2 (`membre && 18 <= edat <= 65`) |
| **Límit Soci 18a** | 18 | 30 € | true | `Tarifa Eco: 1.50€` | Regla 2 (límit inferior inclusiu) |
| **Límit Soci 65a** | 65 | 30 € | true | `Tarifa Eco: 1.50€` | Regla 2 (límit superior inclusiu) |
| **Client Estàndard** | 30 | 40 € | false | `Tarifa Estándar: 4.95€` | Regla 3 (no compleix regla 1 ni 2) |
| **Soci Senior** | 70 | 30 € | true | `Tarifa Estándar: 4.95€` | Regla 3 (edat > 65 queda fora de tarifa eco) |
