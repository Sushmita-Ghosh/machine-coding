import { useEffect, useMemo, useRef, useState } from "react";

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    width: "300px",
    margin: "20px auto",
    fontFamily: "sans-serif",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "10px",
  },
  list: {
    border: "1px solid #eee",
    borderRadius: "6px",
    padding: "10px",
  },
  placeholder: {
    textAlign: "center",
    color: "#999",
    padding: "20px 0",
  },
};

// const SearchFilter = ({ items }: { items: string[] }) => {
//   const [query, setQuery] = useState("");

//   // TODO: implement logic
//   const filteredItems: string[] = useMemo(() => {
//     return items.filter((item) =>
//       item.toLowerCase().includes(query.toLowerCase())
//     );
//   }, [items, query]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // TODO
//     setQuery(e.target.value);
//   };

//   return (
//     <div style={styles.container}>
//       <input
//         style={styles.input}
//         placeholder="Search..."
//         value={query}
//         onChange={handleChange}
//       />

//       <div style={styles.list}>
//         <div style={styles.placeholder}>
//           {filteredItems.length ? (
//             filteredItems.map((item) => <div key={item}>{item}</div>)
//           ) : (
//             <div>No results found</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchFilter;

/**
 * Above is the basic code to design search functionality
 * 1. Adding debounce Debouncing avoids filtering on every keystroke. Useful for large lists or API calls.
 *
 */

/** DEBOUNCED LOGIC */

// const useDebounce = (value = "", delay = 2000) => {
//   const [debounce, setDebounce] = useState(value);

//   useEffect(() => {
//     setTimeout(() => {
//       setDebounce(value);
//     }, delay);
//   }, [value, delay]);

//   return debounce;
// };

// const SearchFilter = ({ items }: { items: string[] }) => {
//   const [query, setQuery] = useState("");
//   const debouncedQuery = useDebounce(query, 2000);

//   // TODO: implement logic
//   const filteredItems: string[] = useMemo(() => {
//     return items.filter(
//       (item) => item.toLowerCase().includes(debouncedQuery.toLowerCase()) // we will use the debounced query
//     );
//   }, [items, debouncedQuery]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // TODO
//     setQuery(e.target.value);
//   };

//   return (
//     <div style={styles.container}>
//       <input
//         style={styles.input}
//         placeholder="Search..."
//         value={query}
//         onChange={handleChange}
//       />

//       <div style={styles.list}>
//         <div style={styles.placeholder}>
//           {filteredItems.length ? (
//             filteredItems.map((item) => <div key={item}>{item}</div>)
//           ) : (
//             <div>No results found</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchFilter;

/**
 * 2. Highlight matched Text
 */

// const SearchFilter = ({ items }: { items: string[] }) => {
//   const [query, setQuery] = useState("");

//   // TODO: implement logic
//   const filteredItems: string[] = useMemo(() => {
//     return items.filter((item) =>
//       item.toLowerCase().includes(query.toLowerCase())
//     );
//   }, [items, query]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     // TODO
//     setQuery(e.target.value);
//   };

//   const highlightText = (text: string, query: string) => {
//     if (!query) return text; /** no query , return text "" */

//     const lowerCaseText = text.toLowerCase();
//     const lowerCaseQuery = query.toLowerCase();

//     const startIndex = lowerCaseText.indexOf(lowerCaseQuery);
//     const endIndex = startIndex + lowerCaseQuery.length;

//     if (startIndex == -1) return text; // no match for query (if ap - then for banana this case applies)

//     const beforeQuery = text.slice(0, startIndex);
//     const match = text.slice(startIndex, endIndex);
//     const afterQuery = text.slice(endIndex);

//     return (
//       <>
//         {beforeQuery}
//         <span style={{ backgroundColor: "yellow" }}>{match}</span>
//         {afterQuery}
//       </>
//     );
//   };

//   return (
//     <div style={styles.container}>
//       <input
//         style={styles.input}
//         placeholder="Search..."
//         value={query}
//         onChange={handleChange}
//       />

//       <div style={styles.list}>
//         <div style={styles.placeholder}>
//           {filteredItems.length ? (
//             filteredItems.map((item) => (
//               <div key={item}>{highlightText(item, query)}</div>
//             ))
//           ) : (
//             <div>No results found</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchFilter;

/**
 * 3. Keyboard Navigation
 * Use up/down arrow keys to navigate the filtered list and enter to select.
 */

const SearchFilter = ({ items }: { items: string[] }) => {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const listRef = useRef<HTMLDivElement>(null);

  // TODO: implement logic
  const filteredItems: string[] = useMemo(() => {
    return items.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
  }, [items, query]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    if (e.key === "ArrowDown") {
      /**
       * Checks if the user pressed the Down arrow key.
       * activeIndex is the index of the currently selected/highlighted item in the filtered list.
       * setActiveIndex updates it:
       * If prev < filteredItems.length - 1, increment by 1 → moves selection down.
       * Else, keep it the same (prevents going past the last item).
       * ✅ Functionality: Moves the highlighted item down the list when user presses ↓.
       */
      setActiveIndex((prev) =>
        prev < filteredItems.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === "ArrowUp") {
      /**Checks if the user pressed the Up arrow key.
       * Updates activeIndex:
       * If prev > 0, decrement by 1 → moves selection up.
       * Else, set it to -1 → no item selected.
       * ✅ Functionality: Moves the highlighted item up the list when user presses ↑.
       * */
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && activeIndex >= 0) {
      /**
       * Checks if the user pressed Enter AND if a valid item is selected (activeIndex >= 0).
       * filteredItems[activeIndex] gives the currently highlighted item.
       * alert shows the selected item.
       */
      alert(`Selected: ${filteredItems[activeIndex]}`);
    }
  };

  return (
    <div style={styles.container}>
      <input
        style={styles.input}
        placeholder="Search..."
        value={query}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />

      <div style={styles.list}>
        <div style={styles.placeholder} ref={listRef}>
          {filteredItems.length ? (
            filteredItems.map((item, idx) => (
              <div
                key={item}
                style={{
                  /** Adding background color to keyupand down */
                  backgroundColor: idx === activeIndex ? "#ddd" : "transparent",
                }}
              >
                {item}
              </div>
            ))
          ) : (
            <div>No results found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;

/**
 * 4. API Based Search with loading and error states
 */
