import SearchFilter from "./SearchFilter";

export default function App() {
  const items = [
    "Apple",
    "Banana",
    "Grapes",
    "Orange",
    "Strawberry",
    "Pineapple"
  ];

  return (
    /** center the SearchFilter component */
    <div style={{ display: "flex", justifyContent: "center", width: "100svw" }}>
      <SearchFilter items={items} />
    </div>
  );
}