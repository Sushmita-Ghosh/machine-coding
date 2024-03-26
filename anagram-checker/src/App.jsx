import { useState } from "react";
import "./App.css";

function App() {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [anagram, setAnagram] = useState(null);

  const isAnagramHandler = () => {
    // if someone has entered numbers replace them with "" and make the strings to lowercase

    // normalisation
    const normalisedString = (str) => str.replace(/[^\w]/g, "");

    const normalisedText1 = normalisedString(text1);
    const normalisedText2 = normalisedString(text2);

    console.log(normalisedText1, normalisedText2);

    // sort the strings
    let sortedText1 = normalisedText1.split("").sort().join("");
    let sortedText2 = normalisedText2.split("").sort().join("");

    if (sortedText1 === sortedText2) {
      setAnagram(true);
    } else {
      setAnagram(false);
    }
  };

  return (
    <section>
      <h1>Anagram Checker</h1>
      <div className="b">
        <input
          type="text"
          value={text1}
          onChange={(e) => setText1(e.target.value)}
        />
        <input
          type="text"
          value={text2}
          onChange={(e) => setText2(e.target.value)}
        />

        <button onClick={isAnagramHandler}>Check Anagram</button>
      </div>

      {anagram !== null &&
        (anagram === true ? (
          <p>These are Anangram</p>
        ) : (
          <p>These are Not Anangram</p>
        ))}
    </section>
  );
}

export default App;
