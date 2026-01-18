# OTP Input

<img width="952" height="371" alt="image" src="https://github.com/user-attachments/assets/820f59dc-a516-4acd-9b78-a2347a8745c9" />

<img width="667" height="712" alt="image" src="https://github.com/user-attachments/assets/d83d8c23-500f-404a-9c1c-5f9edd49d53f" />



# Nuamces while codinf:
## 🧩 The Problem You’re Seeing

Pressing **Backspace**:

- Focus moves to the previous input  
- **AND** the previous input’s value gets deleted  

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
