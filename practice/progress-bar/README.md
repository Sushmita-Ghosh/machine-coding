# Progress Bar

# Why `translateX` Uses Negative Values in a Progress Bar

Let’s go step by step.

---

## 1️⃣ How `translateX()` Works

```css
transform: translateX(X);
```

- Positive X → moves the element to the right
- Negative X → moves the element to the left

```css
translateX(20px);   /* moves right */
translateX(-20px);  /* moves left */
```

So, if progress is 20% the value of translateX should be -80% (progress - 100)

## 1️⃣ inset: 0

inset is a shorthand for these four properties:

```css
top
right
bottom
left
```

So:

inset: 0;

is exactly the same as:

```css
top: 0;
right: 0;
bottom: 0;
left: 0;
```

### transform-origin: left;

“All transforms should start from the left edge.”

## aria-valuetext={`${progress}% complete`}

Why:
Screen readers will announce something meaningful like:

“Progress bar, 75 percent complete”
