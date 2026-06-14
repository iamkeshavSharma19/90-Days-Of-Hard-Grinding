why it is necessary to use Json.parse and json.stringify here while dealing with the localStorage

```javascriptreact
const savedUsers = JSON.parse(localStorage.getItem("users")) || [];
    savedUsers.push(formData); // [{}, {}]
    localStorage.setItem("users", JSON.stringify(savedUsers));
```

## localStorage sirf strings store karta hai!

**That's the core reason.** localStorage ek key-value store hai, but dono — key aur value — **sirf strings** ho sakti hain.

---

### Problem without JSON methods:

```js
const user = { name: "Keshav", age: 22 };

localStorage.setItem("user", user);
// ❌ Jo actually store hoga: "[object Object]"  ← useless string!

localStorage.getItem("user");
// ❌ Returns: "[object Object]"  ← ab tum isse object mein wapas nahi kar sakte
```

JavaScript automatically object ko string mein convert karta hai using `.toString()`, which gives `"[object Object]"` — completely useless.

---

### Solution — JSON methods:

```js
// SAVE karte waqt: Object → String
JSON.stringify({ name: "Keshav", age: 22 });
// ✅ '{"name":"Keshav","age":22}'  ← valid string, readable

// LOAD karte waqt: String → Object
JSON.parse('{"name":"Keshav","age":22}');
// ✅ { name: "Keshav", age: 22 }  ← wapas object ban gaya
```

---

### Tera code line by line:

```js
// 1️⃣ localStorage se string uthao → parse karke array banao
//    agar kuch nahi mila (null) toh empty array lo
const savedUsers = JSON.parse(localStorage.getItem("users")) || [];

// 2️⃣ Naya user push karo array mein (normal JS object)
savedUsers.push(formData); // [{...}, {...}]

// 3️⃣ Poore array ko string banao → localStorage mein save karo
localStorage.setItem("users", JSON.stringify(savedUsers));
```

---

### Memory trick:

| Action                     | Method             | Direction       |
| -------------------------- | ------------------ | --------------- |
| **Save** to localStorage   | `JSON.stringify()` | Object → String |
| **Read** from localStorage | `JSON.parse()`     | String → Object |

> **Rule:** Jo bhi localStorage mein jaaye → `stringify`. Jo bhi localStorage se aaye → `parse`.

## Haan, almost! But thoda aur precise samajhte hain 👇

---

### JSON **is not** an object — it's a **text format**

JSON ka full form hai — **JavaScript Object Notation**

Yeh ek **string representation** hai data ka, jo _looks like_ a JS object, but **actually sirf text hai.**

```js
// ✅ JavaScript Object — actual object in memory
const obj = { name: "Keshav", age: 22 };

// ✅ JSON — sirf ek string hai, jo object jaisi dikhti hai
const json = '{"name":"Keshav","age":22}';
```

Notice karo — JSON string mein **single quotes** ke andar hai, aur **keys bhi double quotes** mein hain. Yeh JS object syntax se alag hai.

---

### Dono mein differences:

|                     | JS Object       | JSON String                |
| ------------------- | --------------- | -------------------------- |
| Type                | `object`        | `string`                   |
| Keys                | quotes optional | **double quotes required** |
| Methods allowed     | ✅ haan         | ❌ nahi                    |
| Functions allowed   | ✅ haan         | ❌ nahi                    |
| `undefined` allowed | ✅ haan         | ❌ nahi                    |

```js
// JS Object — sab kuch allowed
const obj = {
  name: "Keshav",
  greet: function () {}, // ✅ function
  score: undefined, // ✅ undefined
};

// JSON mein convert karo — sab gayab!
JSON.stringify(obj);
// '{"name":"Keshav"}'  ← function aur undefined dono drop ho gaye
```

---

### Teri definition ko thoda refine karein:

> ❌ "JSON is an object covered with string"

> ✅ **"JSON ek string hai jo object ki tarah dikhti hai"** — it's a universal text format to _represent_ data, not an actual object.

---

### Real world mein JSON:

JSON sirf localStorage ke liye nahi hai — **APIs bhi JSON text bhejte hain** network pe, kyunki network pe sirf text travel karta hai, objects nahi.

```js
// API se data aata hai as JSON string
fetch("/api/users").then((res) => res.json()); // ← yahan bhi internally JSON.parse ho raha hai!
```

If I write this way

```javascriptreact
import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const TodoContext = createContext();

const TodoContextProvider = (props) => {
  const [todo, setTodo] = useState("");
  const [allTodos, setAllTodos] = useState([]);
  console.log(allTodos);
  const handleTodo = (e) => {
    setTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      text: todo.trim(),
    };
    console.log(newTodo);
    setAllTodos((prev) => {
      return [...prev, newTodo];
    });

    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    savedTodos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    setTodo("");
  };
  return (
    <TodoContext.Provider value={{ todo, handleTodo, handleSubmit }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;



OR THIS WAY

import React from "react";
import { useState } from "react";
import { createContext } from "react";

export const TodoContext = createContext();

const TodoContextProvider = (props) => {
  const [todo, setTodo] = useState("");
  const [allTodos, setAllTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  console.log(allTodos);
  const handleTodo = (e) => {
    setTodo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTodo = {
      id: Date.now(),
      text: todo.trim(),
    };
    console.log(newTodo);
    setAllTodos((prev) => {
      return [...prev, newTodo];
    });

    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    savedTodos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(savedTodos));
    setTodo("");
  };
  return (
    <TodoContext.Provider value={{ todo, handleTodo, handleSubmit }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContextProvider;


I think that there is no difference

```

## Bahut bada difference hai! 🔥

### Difference sirf ek cheez mein hai — **page refresh ke baad**

---

### Way 1 — `useState([])`

```js
const [allTodos, setAllTodos] = useState([]);
// Har refresh pe → fresh empty array
// localStorage mein data pada hua hai, but ignore ho raha hai!
```

---

### Way 2 — `useState(() => { localStorage... })`

```js
const [allTodos, setAllTodos] = useState(() => {
  const savedTodos = localStorage.getItem("todos");
  return savedTodos ? JSON.parse(savedTodos) : [];
});
// Pehli render pe → localStorage se data uthao
// Agar data hai → wahi use karo
// Agar nahi hai → empty array
```

---

### Real scenario mein fark:

| Action                | Way 1              | Way 2                       |
| --------------------- | ------------------ | --------------------------- |
| App kholo pehli baar  | `[]` ✅            | `[]` ✅                     |
| 3 todos add karo      | `[t1,t2,t3]` ✅    | `[t1,t2,t3]` ✅             |
| **Page refresh karo** | `[]` ❌ sab gayab! | `[t1,t2,t3]` ✅ data wapas! |

---

### Toh `handleSubmit` mein localStorage save karna common hai dono mein —

**lekin fark sirf initial load pe hai:**

```
Way 1 → localStorage mein data hai, but React state ko pata hi nahi 😢
Way 2 → localStorage se data uthake React state mein daal diya 🎉
```

**Way 2 use karo** — yahi sahi todo app ka behavior hai!

par haan main ui pe todos display karne ke liye allTodos state variable ke place pe savedTodos ka use bhi toh kar sakta hoon

allTodos wala masla hi khatam kyun bhai

Bhai, **nahi kar sakta!** 😄

`savedTodos` sirf ek **local variable** hai `useState` ke andar — woh **sirf ek baar chalta hai** app load pe, aur phir khatam!

```js
const [allTodos, setAllTodos] = useState(() => {
  const savedTodos = localStorage.getItem("todos"); // ← sirf ek baar chala
  return savedTodos ? JSON.parse(savedTodos) : [];
  // savedTodos yahan khatam ho gaya, bahar exist hi nahi karta
});

// ❌ Yeh kaam nahi karega
console.log(savedTodos); // ReferenceError: savedTodos is not defined
```

---

### Asal problem — localStorage **reactive nahi hai!**

```js
// Naya todo add kiya
localStorage.setItem("todos", JSON.stringify(updatedTodos));

// ❌ UI update nahi hoga!
// localStorage change hone pe React ko pata hi nahi chalta
// Component re-render nahi hoga
```

### React sirf **state change** pe re-render karta hai:

```
localStorage change → React ko pata nahi → UI same rahega ❌
State change (setAllTodos) → React ko pata chala → UI update ✅
```

---

### Isliye dono ki zaroorat hai — alag alag kaam ke liye:

```
allTodos (state) → UI display karne ke liye 👀
localStorage → Data permanently save karne ke liye 💾
```

Yeh do alag cheezein hain — ek doosre ko replace nahi kar sakti!
