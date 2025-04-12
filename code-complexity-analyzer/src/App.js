import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("cpp");
    const [result, setResult] = useState(null);

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (code.trim() === "") {
          alert("Please enter some code before submitting.");
          return; // Stop further execution
      }
      console.log("📝 Submitted Code:", code);
      console.log("🌐 Selected Language:", language);
        try {
            const response = await axios.post("http://localhost:8080/analyze", {
                code,
                language
            });
          setResult(response.data);
          alert("Analysis Complete!");
        } catch (error) {
          console.error("Error analyzing code:", error);
          alert("An error occurred during analysis. Please try again.");
        }
    };

    return (
        <div className="App">
            <h1>Code Complexity Analyzer</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={code}
                    onChange={handleCodeChange}
                    placeholder="Paste your code here"
                    rows="10"
                    cols="50"
                />
                <div>
                    <label>Choose language: </label>
            <select onChange={handleLanguageChange} value={language}>
                        <option value="cpp">C++</option>
                        <option value="java">Java</option>
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="golang">Go</option>
                        <option value="csharp">C#</option>
                    </select>
                </div>
                <button type="submit">Analyze</button>
            </form>

            {result && (
                <div>
                    <h3>Results:</h3>
                    <p>Time Complexity: {result.timeComplexity}</p>
                    <p>Space Complexity: {result.spaceComplexity}</p>
                </div>
        )}
            <div className="center-footer">
                <p>
                    Made with <span role="img" aria-label="heart">❤️</span> in India -AR
                </p>
            </div>
        </div>
    );
}

export default App;
