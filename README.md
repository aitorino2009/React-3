# React 3: Renderitzat i Renderitzat Condicional

**Mòdul:** Desenvolupament Web en Entorn Client (APOF)  
**Alumne:** Aitor Portales Crespí  
**Centre:** CC Sant Josep Obrer  
**Repositori Oficial:** [https://github.com/aitorino2009/React-3.git](https://github.com/aitorino2009/React-3.git)  

---

## 📌 Descripció del Projecte

Aquest projecte conté la implementació completa de la unitat didàctica **"4. Renderitzat i Renderitzat Condicional a React"**, incloent tots els exercicis pràctics del bloc 4.2 i el **Desafío React 3 (Validador GreenTech per a EcoShop Solutions)**.

S'ha implementat seguint les millors pràctiques d'enginyeria de software:
- **Arquitectura basada en Funcions Pures**: Funcions deterministes, sense efectes secundaris impurs.
- **Operadors Ternaris nets i anidats**: Sintaxi concisa per al renderitzat condicional.
- **Flux de Git professional per branques**: Cada funcionalitat i exercici ha estat desenvolupat en la seva pròpia branca amb commits descriptius en castellà i posterior fusió a `main`.
- **Suite de Proves Automatitzades**: Verificació del 100% de les regles de negoci amb `node:test`.
- **Disseny corporatiu amb estils en línia**: Requisit del desafiament per simular un component autònom per a comerç electrònic sostenible.

---

## 🌿 Estructura de Branques a Git

Tal com s'ha demanat a l'enunciat, el projecte ha seguit una metodologia de treball per branques:

| Branca | Propòsit |
|---|---|
| `main` | Branca principal de producció amb tot el codi integrat i estable |
| `rama-ejercicio-4-1` | Implementació del component `ProgramaPrecio.jsx` amb càlcul condicional del preu de bitllet |
| `rama-ejercicio-4-2` | Implementació de `ProgramaVotacion.jsx` amb validació estesa (`valor > 100 ➔ false`) |
| `rama-ejercicio-4-3` | Implementació de `ProgramaTemperatura.jsx` amb classificació tèrmica per rangs |
| `rama-ejercicio-4-4` | Implementació de `ProgramaListadoAlumnos.jsx` i comprovació del canvi de `id` |
| `rama-desafio-ecoenvios` | Implementació del component corporatiu `EcoEnvios.jsx` per a *EcoShop Solutions* |
| `rama-interfaz-app` | Integració de components a `App.jsx`, sistema de pestanyes i full d'estils `App.css` |
| `rama-pruebas-unitarias` | Suite de tests automatitzats a `src/test_ejercicios.mjs` i mòdul de lògica pura |
| `rama-documentacion` | Documentació tècnica completa (`README.md`, `RESPUESTAS_TEORIA.md`, `RESPOSTES_TEORIA.md`) |

---

## 🚀 Contingut dels Exercicis

### Exercici 4.1: `ProgramaPrecio.jsx`
- **Objectiu:** Modificar les condicions ternàries per complir:
  1. Si l'edat és major o igual a 65 anys: el preu és **0 €** (jubilats).
  2. Si l'edat és major o igual a 18 anys: el preu és **1 €** (adults).
  3. Menors d'edat (< 18 anys): no paguen (**0 €**).
- **Codi clau:**
  ```javascript
  const resultado = (edad >= 65) ? 0 : (edad >= 18) ? 1 : 0;
  ```

### Exercici 4.2: `ProgramaVotacion.jsx`
- **Objectiu:** Executar el codi base i afegir la condició perquè la funció `validar` retorni `false` en cas que `valor > 100`.
- **Codi clau:**
  ```javascript
  const validar = (dato) => {
    const valor = Number(dato);
    return (isNaN(valor) || valor > 100 || valor < 0) ? false : valor;
  };
  ```

### Exercici 4.3: `ProgramaTemperatura.jsx`
- **Objectiu:** Crear un programa amb funcions que respongui segons la temperatura en ºC:
  - Entre 0 i 10ºC ➔ `'Molt fred'`
  - Entre 10 i 20ºC ➔ `'Temperatura mitjana'`
  - Entre 20 i 30ºC ➔ `'Calor'`
  - Valors extrems tractats de forma controlada (< 0ºC i > 30ºC).

### Exercici 4.4: `ProgramaListadoAlumnos.jsx`
- **Objectiu:** Comprovar quin component es renderitza en canviar manualment el valor de `id` de l'objecte `Alumno`:
  - **Amb `id: 1`:** La condició ternària `(datos.id === 1)` avalua a `true` i renderitza el component `<Detalles />`, mostrant únicament l'element de llista amb el nom: `<li><b>Ana</b></li>`.
  - **Amb `id !== 1` (ex. `id: 2`):** La condició avalua a `false` i renderitza el component `<Completo />`, mostrant tota la informació: `<p>2 - <b>Ana</b> - <b>Alvarez</b></p>`.

---

## 🏆 Desafío React 3: Validador de Descuentos "GreenTech"

### Context del Projecte
Treballem a *EcoShop Solutions*, una startup d'e-commerce ecològic sostenible. Hem creat el component `EcoEnvios.jsx` integrat al carret de compra que avalua múltiples condicions creuades mitjançant **funcions pures** i **operadors ternaris anidats**.

### Variables d'entrada:
- `userAge`: Edat del client (per defecte: `29`).
- `purchaseAmount`: Import total de la compra en euros (per defecte: `45`).
- `isEcoMember`: Booleà si és membre del Club Verd (per defecte: `true`).

### Regles de Negoci implementades:
1. **Enviament Gratuït:** Si `userAge < 18` **O** si `purchaseAmount > 50` ➔ `"¡Envío Gratuito! (0€)"`.
2. **Descompte per Membresia:** Si `isEcoMember === true` i l'edat està compresa entre 18 i 65 anys (ambdues incloses) ➔ `"Tarifa Eco: 1.50€"`.
3. **Tarifa Estàndard:** Per a qualsevol altre cas ➔ `"Tarifa Estándar: 4.95€"`.

### Funció Pura amb Operadors Ternaris:
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

---

## 🛠️ Com Executar el Projecte

### 1. Clonar el repositori
```bash
git clone https://github.com/aitorino2009/React-3.git
cd "React-3"
```

### 2. Instal·lar dependències
```bash
npm install
```

### 3. Executar en mode desenvolupament
```bash
npm run dev
```
Obre el navegador a `http://localhost:5173`.

### 4. Executar les proves automatitzades
```bash
npm test
```

### 5. Compilar per a producció
```bash
npm run build
```

---

## 📁 Estructura de Fitxers

```
React 3/
├── public/
├── src/
│   ├── components/
│   │   ├── EcoEnvios.jsx              # Desafío GreenTech amb estils en línia
│   │   ├── ProgramaPrecio.jsx         # Exercici 4.1
│   │   ├── ProgramaVotacion.jsx       # Exercici 4.2
│   │   ├── ProgramaTemperatura.jsx    # Exercici 4.3
│   │   └── ProgramaListadoAlumnos.jsx # Exercici 4.4
│   ├── utils/
│   │   └── logicaEnvios.js            # Funcions pures per a càlculs
│   ├── test_ejercicios.mjs            # Suite de proves unitàries (node:test)
│   ├── App.css                        # Estils i disseny del panell interactiu
│   ├── App.jsx                        # Component arrel amb gestor de pestanyes
│   ├── index.css
│   └── main.jsx
├── README.md                          # Documentació general
├── RESPUESTAS_TEORIA.md               # Respostes teòriques en castellà
├── RESPOSTES_TEORIA.md                # Respostes teòriques en català
├── package.json
└── vite.config.js
```
