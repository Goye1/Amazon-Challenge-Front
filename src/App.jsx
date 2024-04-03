import React, { useState, useMemo } from "react";
import ReactWordcloud from "react-wordcloud";

const MemoizedReactWordcloud = React.memo(ReactWordcloud);

function App() {
  const [url, setUrl] = useState("");
  const [wordFrequenciesArray, setWordFrequenciesArray] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `http://localhost:8080/api/wordcloud/generateWordCloud?productUrl=${encodeURIComponent(
          url
        )}`,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Error al generar la nube de palabras");
      }
      const wordFrequencies = await response.json();
      const wordFrequenciesArray = Object.entries(wordFrequencies).map(
        ([text, value]) => ({ text, value })
      );
      setWordFrequenciesArray(wordFrequenciesArray);
      console.log(wordFrequenciesArray);
    } catch (error) {
      setError("Error: " + error);
    } finally {
      setLoading(false);
    }
  };

  const wordCloudOptions = useMemo(
    () => ({
      rotations: 22,
      rotationAngles: [0],
      fontSizes: [20, 70],
      colors: [
        "#1f77b4",
        "#ff7f0e",
        "#2ca02c",
        "#d62728",
        "#9467bd",
        "#8c564b",
        "#e377c2",
        "#7f7f7f",
        "#bcbd22",
        "#17becf",
      ],
    }),
    []
  );

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Word Cloud Generator</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ marginRight: "10px" }}
          />
          <label htmlFor="url">Paste Amazon product URL.</label>
        </div>
        <button
          type="submit"
          className="button"
          disabled={loading}
          style={{ pointerEvents: loading ? "none" : "auto" }}
        >
          Generate
        </button>
      </form>
      <div className="container">
        <div className="cloud">
          {loading ? (
            <span className="loader"></span>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              {wordFrequenciesArray.length > 0 && (
                <MemoizedReactWordcloud
                  options={wordCloudOptions}
                  words={wordFrequenciesArray}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
