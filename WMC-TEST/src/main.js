/////////////////////////////////////////////////////////////////
// A) ARRAYS — Aufgaben + Lösungen
/////////////////////////////////////////////////////////////////

///////////////////////
// A1 – Lagerbereinigung & Preisupdate
// Gegeben:
// const items = [
//   { id: 1, name: "SSD", price: 79.9, stock: 5, category: "hardware" },
//   { id: 2, name: "HDMI Cable", price: 8.5, stock: 0, category: "cables" },
//   { id: 3, name: "Keyboard", price: 39.0, stock: 12, category: "peripherals" },
//   { id: 4, name: "GPU", price: 499.0, stock: 2, category: "hardware" },
// ];
//
// Aufgabe: Erzeuge deklarativ ein neues Array mit:
// – nur Artikeln mit stock > 0
// – 10% Preisaufschlag
// – zusätzlichem Feld isPremium: price >= 100
// – Original darf NICHT verändert werden
///////////////////////

const items = [
    { id: 1, name: "SSD", price: 79.9, stock: 5, category: "hardware" },
    { id: 2, name: "HDMI Cable", price: 8.5, stock: 0, category: "cables" },
    { id: 3, name: "Keyboard", price: 39.0, stock: 12, category: "peripherals" },
    { id: 4, name: "GPU", price: 499.0, stock: 2, category: "hardware" },
];

const updatedItems = items
    .filter(item => item.stock > 0)
    .map(item => {
        const price = +(item.price * 1.10).toFixed(2);
        return {
            ...item,
            price,
            isPremium: price >= 100
        };
    });

console.log("A1 result:", updatedItems);



///////////////////////
// A2 – Ungerade Zahlen quadrieren
// Gegeben: const numbers = [5, 12, 7, 8, 3, 10];
// – Imperativ: ungerade Zahlen filtern + quadrieren
// – Deklarativ: das gleiche mit filter + map
///////////////////////

const numbers = [5, 12, 7, 8, 3, 10];

// Imperativ
const oddSquaresImperative = [];
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 !== 0) {
        oddSquaresImperative.push(numbers[i] ** 2);
    }
}

// Deklarativ
const oddSquaresDeclarative = numbers
    .filter(n => n % 2 !== 0)
    .map(n => n ** 2);

console.log("A2 imperative:", oddSquaresImperative);
console.log("A2 declarative:", oddSquaresDeclarative);



///////////////////////
// A3 – Teams mergen, Duplikate entfernen, Coach einfügen
// Gegeben:
// const teamA = ["Mia", "Noah", "Lena"];
// const teamB = ["Ben", "Lea", "Noah"];
//
// Aufgabe:
// – Neues Array mit teamA + teamB
// – "Coach" an Index 0
// – BONUS1: Duplikate entfernen (Set)
// – BONUS2: alphabetisch sortieren
///////////////////////

const teamA = ["Mia", "Noah", "Lena"];
const teamB = ["Ben", "Lea", "Noah"];

let teamMerged = ["Coach", ...teamA, ...teamB];
teamMerged = [...new Set(teamMerged)]; // BONUS1
teamMerged.sort(); // BONUS2

console.log("A3 result:", teamMerged);



///////////////////////
// A4 – Any, Every
// Gegeben: const scores = [85, 92, 78, 90, 88];
// – Prüfe: alle >= 80?
// – Prüfe: mindestens ein Score >= 95?
///////////////////////

const scores = [85, 92, 78, 90, 88];

const allAbove80 = scores.every(s => s >= 80);
const anyAtLeast95 = scores.some(s => s >= 95);

console.log("A4 all >=80:", allAbove80);
console.log("A4 any >=95:", anyAtLeast95);



/////////////////////////////////////////////////////////////////
// B) FUNCTIONS — Aufgaben + Lösungen
/////////////////////////////////////////////////////////////////

///////////////////////
// B1 – avg(...nums)
// – Beliebig viele Zahlen
// – Validieren: typeof number, sonst TypeError
// – Durchschnitt → 2 Nachkommastellen, Number
// Beispiele: avg(2,4)=3, avg(1,2,3)=2
///////////////////////

function avg(...nums) {
    if (!nums.length) throw new TypeError("No numbers provided!");

    nums.forEach(n => {
        if (typeof n !== "number") throw new TypeError("All arguments must be numbers");
    });

    const sum = nums.reduce((acc, n) => acc + n, 0);
    return +(sum / nums.length).toFixed(2);
}

console.log("B1 avg(2,4) =", avg(2, 4));
console.log("B1 avg(1,2,3) =", avg(1, 2, 3));



///////////////////////
// B2 – pick(obj, keysArray)
// – neues Objekt nur mit Keys aus keysArray
// – obj NICHT mutieren
// Beispiel: pick({a:1,b:2,c:3}, ["a","c"]) // {a:1, c:3}
///////////////////////

function pick(obj, keysArray) {
    const result = {};
    keysArray.forEach(key => {
        if (key in obj) result[key] = obj[key];
    });
    return result;
}

console.log("B2:", pick({ a: 1, b: 2, c: 3 }, ["a", "c"]));



///////////////////////
// B3 – addPixel(px1, px2)
// – Beide Strings: "<number>px"
// – Addieren → Ergebnis "xxxpx"
// – bei ungültigem Format → Error
///////////////////////

function addPixel(px1, px2) {
    const match1 = /^(\d+)px$/.exec(px1);
    const match2 = /^(\d+)px$/.exec(px2);

    if (!match1 || !match2) throw new Error("Invalid px format");

    return Number(match1[1]) + Number(match2[1]) + "px";
}

console.log("B3 addPixel:", addPixel("100px", "250px"));



/////////////////////////////////////////////////////////////////
// C) OBJECTS — Aufgaben + Lösungen
/////////////////////////////////////////////////////////////////

///////////////////////
// C1 – immutable Profil-Update
// profile2:
// – address.city = "Wien"
// – preferences.langs + "fr"
// – NICHT mutieren
// – console.log aller top-level key=value
///////////////////////

const profile = {
    id: 42,
    name: "Max",
    address: { city: "Linz", zip: "4020" },
    preferences: { theme: "light", langs: ["de", "en"] }
};

const profile2 = {
    ...profile,
    address: {
        ...profile.address,
        city: "Wien"
    },
    preferences: {
        ...profile.preferences,
        langs: [...profile.preferences.langs, "fr"]
    }
};

console.log("C1 profile2:");
Object.entries(profile2).forEach(([key, value]) => {
    console.log(`${key}=${JSON.stringify(value)}`);
});



///////////////////////
// C2 – Methode hinzufügen
// account.calcFee() →
// – 1% Fee wenn isPremium
// – sonst 2%
///////////////////////

const account = { balance: 1000, currency: "EUR", isPremium: false };

account.calcFee = function () {
    return this.balance * (this.isPremium ? 0.01 : 0.02);
};

console.log("C2 calcFee:", account.calcFee());



/////////////////////////////////////////////////////////////////
// D) SPREAD · REST · DESTRUCTURING — Aufgaben + Lösungen
/////////////////////////////////////////////////////////////////

///////////////////////
// D1 – Array-Spread
// Städte-Array + "Wien" davor + "Salzburg" danach
// cities + more kombinieren
///////////////////////

const cities = ["Graz", "Linz"];
const withWienSalzburg = ["Wien", ...cities, "Salzburg"];

const more = ["Innsbruck", "Klagenfurt"];
const combinedCities = [...cities, ...more];

console.log("D1:", withWienSalzburg, combinedCities);



///////////////////////
// D2 – Object-Spread
// – Neues Objekt: + active:true
// – Neues Objekt: role:"admin", lastLogin:"2025-11-02"
///////////////////////

const base = { id: 1, role: "user" };

const result1 = { ...base, active: true };
const result2 = { ...base, role: "admin", lastLogin: "2025-11-02" };

console.log("D2:", result1, result2);



///////////////////////
// D3 – Destructuring
// coords → lat + restCoords
// settings → theme + version als ver + Rest in otherSettings
///////////////////////

const coords = [48.2082, 16.3738, 171];
const [lat, ...restCoords] = coords;

console.log("D3 coords:", lat, restCoords);

const settings = { theme: "dark", version: "1.0.2", flags: { beta: true } };
const { theme, version: ver, ...otherSettings } = settings;

console.log("D3 settings:", theme, ver, otherSettings);



///////////////////////
// D4 – Funktionen mit Spread
///////////////////////

function sumAll(...numbers) {
    return numbers.reduce((a, b) => a + b, 0);
}

console.log("D4 sumAll:", sumAll(1, 2, 3, 4));



///////////////////////
// D5 – Funktion mit Destructuring
///////////////////////

function MyComponent({ title, name }) {
    console.log(`${title} - ${name}`);
}

const person = { title: "Developer", name: "Alice" };
MyComponent(person);




// Component Hierarchie:
// App
//  ├─ ListComponent
//  └─ ButtonComponent

// What is a React Component?
// - A function that returns JSX (via return statement)
// - Can accept input via "props" (properties)
// - Can manage its own state (via useState hook, not shown here)

// What is JSX?
// - JavaScript XML
// - Allows to write HTML-like code in JavaScript

// What are props?
// - Passed as an object to the component function (its just a object)
// - Used to customize the component's behavior and appearance



function App() {

    const items = [
        { id: 1, name: "Item 1" },
        { id: 2, name: "Item 2" }
    ];

    function handleClick() {
        console.log("Meine Button Komponente wurde geklickt");
    }

    // Render App component
    return (
        <div>
            <h1>React Demo</h1>
            <ListComponent items={items} />
            <ButtonComponent onClick={handleClick} />
        </div>
    );
}

// function ListComponent({ items = [] }) { // Destructuring Variante + Default Wert
function ListComponent(props) {
    // Items is an array passed via props
    const items = props.items;

    // Render empty list message
    if (items.length === 0) {
        return <p>Die Liste ist leer.</p>;
    }

    // Render item list
    return (
        <ul>
            {items.map(item => (
                <li key={item.id}>{item.name}</li>
            ))}
        </ul>
    );
}

// function ButtonComponent({ onClick }) { // Destructuring Variante
function ButtonComponent(props) {
    // Callback is a function passed via props
    const onClick = props.onClick;

    // Render button
    return (
        <button onClick={onClick}>
            Klicke mich
        </button>
    );
}

