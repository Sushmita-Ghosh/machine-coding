# Infinite Scroll in React: Concepts and Explanation

This guide explains the core concepts behind infinite scroll in React, focusing on formulas, state management, and best practices without code implementation.

---

## Key Concepts

### 1. State Management

- **data** → stores the list of items fetched from the API.
- **page** → indicates the current batch or page being fetched.
- **loading** → boolean to track whether a fetch is in progress.

### 2. Limit and Skip

- **limit**: Defines the number of items fetched in a single request.
  - Example: `limit = 10` means 10 items are fetched at a time.

- **skip**: Determines how many items to skip from the start for the next batch.
  - Calculated as `skip = limit * page`.
  - Example: If `limit = 10` and `page = 2`, then `skip = 20`. The fetch will start from the 21st item.

**Formula Explanation:**

```
skip = limit * page
```

- `limit` controls batch size.
- `page` increments each time the user reaches the end of the scroll container.
- `skip` ensures the next batch of data does not overlap with the previous batch.

### 3. Scroll Detection

- Scroll can be detected either on the **window** or a **scrollable container**.
- Condition for triggering the next fetch:

```
scrollTop + clientHeight >= scrollHeight - threshold
```

- **scrollTop** → current scroll position from the top of the container.
- **clientHeight** → visible height of the container.
- **scrollHeight** → total scrollable height of the content.
- **threshold** → optional small number to trigger fetch slightly before reaching the end.

### 4. Loading State

- **loading** is set to `true` when a fetch starts and `false` when it ends.
- Prevents multiple fetches from triggering simultaneously.
- Ensures loading indicators display correctly while data is being fetched.

### 5. Appending Data

- Each new batch of items must be appended to the existing state rather than replacing it.
- Ensures previously fetched items remain visible.

### 6. Cleanup

- Scroll event listeners must be removed on unmount to prevent memory leaks.

---

## Summary

- **Infinite scroll** dynamically loads content as the user scrolls.
- **limit** defines how many items per fetch.
- **skip = limit \* page** ensures proper pagination.
- **loading** prevents overlapping fetches and controls indicators.
- **Scroll detection formulas** help determine when to fetch the next batch.
- Proper **state management** and **cleanup** are essential for performance and stability.
