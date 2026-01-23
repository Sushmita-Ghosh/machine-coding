# OTP Input

<img width="952" height="371" alt="image" src="https://github.com/user-attachments/assets/820f59dc-a516-4acd-9b78-a2347a8745c9" />

<img width="667" height="712" alt="image" src="https://github.com/user-attachments/assets/d83d8c23-500f-404a-9c1c-5f9edd49d53f" />



# Nuances while coding:
## 🧩 The Problem You’re Seeing

Pressing **Backspace**:

- Focus moves to the previous input  
- **AND** the previous input’s value gets deleted
- Focus shifts back to the new input  

**But we want:**  

- Clear the **current input**  
- THEN move focus to the previous input  

---

##  🧠 Why This Happens (Root Cause)

**Key fact:**  

Backspace has a default browser behavior.

When you press Backspace:

- The browser deletes the character in the **currently focused input**  
- If you **change focus too early**, the browser deletes from the **newly focused input**  

💥 That’s exactly what’s happening.

### 🧠 Key Insight (Interview Gold)

* Focus change affects where the browser applies the backspace deletion.
* “Backspace deletes from the currently focused input. If focus changes before deletion completes, the browser deletes the wrong input. Preventing default behavior and controlling deletion order fixes this.”
* “Keyboard events fire before the DOM updates, so focus manipulation must be carefully ordered.”
* **We need to control the sequence**

---

### 🧠 Why This Happens (Root Cause)

🔹 Key fact:

* Backspace has a default browser behavior.
* When you press Backspace:

  * The browser deletes the character in the currently focused input
  * If you change focus too early, the browser deletes from the newly focused input

💥 That’s exactly what’s happening.

---

### Timeline (important 👇)

1. Backspace key pressed
2. JS runs → `focus()` is called
3. Focus jumps to previous input
4. Browser continues default backspace behavior

❌ Deletes value in previous input

So:

* Focus moved **before deletion finished**



## Ref Callbacks:

_“A callback ref is a function ref that React calls with the DOM node, giving more control over how refs are stored or handled.”_

### 🧠 Step 2: What is ref on an input?

When you do: `<input ref={someRef} />`

React assigns the **DOM node** to `someRef.current`.

But here, you have **multiple inputs**, so you **can’t use just one ref**.

👉 You need **one ref per input**.

---

### 🧠 Step 3: Why a function instead of a normal ref?

This: `ref={(input) => (refArr.current[index] = input)}`

is called a **callback ref**.

It means:

> “When this input mounts, give me the DOM node, and I’ll decide what to do with it.”

---

### 🧠 Step 4: What does this line ACTUALLY DO?

In plain English: `(input) => { refArr.current[index] = input; }`

* `input` = the actual DOM element (`<input />`)
* `index` = the position of this OTP box

So this stores:

* `refArr.current[0] = <input />`  // first box
* `refArr.current[1] = <input />`  // second box
* `refArr.current[2] = <input />`  // ...

📦 **Result:**
You now have an **array of input DOM nodes**, so you can programmatically manage focus for each i
