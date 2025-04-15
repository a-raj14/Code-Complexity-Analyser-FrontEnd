import React, { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
    const [code, setCode] = useState("");
    const [language, setLanguage] = useState("cpp");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

    const handleCodeChange = (e) => {
        setCode(e.target.value);
    };

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (code.trim() === "") {
            alert("Please enter some code before submitting.");
                    setLoading(false);
            return;
        }
        console.log("📝 Submitted Code:", code);
        console.log("🌐 Selected Language:", language);
        try {
            const response = await axios.post("http://localhost:8080/analyze", {
                code,
                language
            });
            setResult(response.data);
        } catch (error) {
            console.error("Error analyzing code:", error);
            alert("An error occurred during analysis. Please try again.");
        }
        setLoading(false);
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
            {/* Loader */}
                {loading && (
                <div className="mt-4 text-blue-600 font-semibold">
                    <span role="img" aria-label="sand timer">⏳</span>
                     Analyzing code, please wait...
                    </div>
                )}
            {result && (
                <div>
                    <h3>Results:</h3>
                    <p>Time Complexity: {result.timeComplexity}</p>
                    <p>Space Complexity: {result.spaceComplexity}</p>
                </div>
            )}

            <button onClick={() => setShowExplanation(!showExplanation)} className="toggle-btn">
                {showExplanation ? "Hide Complexity Guide" : "Show Complexity Guide"}
            </button>

            {showExplanation && (
                <div className="explanation">
                    <h3><span role="img" aria-label="book">📚</span> Time Complexity Cheat Sheet</h3>
                    <div className="complexity-grid">
                        <div className="complexity-card">
                            <h4>O(1) - Constant Time</h4>
                            <p>Example: Accessing an array element</p>
                            <code>int x = arr[0];</code>
                            <p>Space: O(1)</p>
                        </div>
                        <div className="complexity-card">
                            <h4>O(log n) - Logarithmic Time</h4>
                            <p>Example: Binary Search</p>
                            <code>
                                while (low &lt;= high) &#123; ... &#125;
                            </code>
                            <p>Space: O(1)</p>
                        </div>
                        <div className="complexity-card">
                            <h4>O(n) - Linear Time</h4>
                            <p>Example: Single loop traversal</p>
                            <code>
                                for (int i = 0; i &lt; n; i++) &#123; ... &#125;
                            </code>
                            <p>Space: O(1)</p>
                        </div>
                        <div className="complexity-card">
                            <h4>O(n²) - Quadratic Time</h4>
                            <p>Example: Nested loops</p>
                            <code>
                                for (int i = 0; i &lt; n; i++) &#123;<br />
                                &nbsp;&nbsp;for (int j = 0; j &lt; n; j++) &#123; ... &#125;<br />
                                &#125;
                            </code>
                            <p>Space: O(1) or more</p>
                        </div>
                        <div className="complexity-card">
                            <h4>O(n³) - Cubic Time</h4>
                            <p>Example: Triple Nested Loop</p>
                            <code>
                                for (int i = 0; i &lt; n; i++) &#123;<br />
                                &nbsp;&nbsp;for (int j = 0; j &lt; n; j++) &#123; ... &#125;<br />
                                &nbsp;&nbsp;for (int k = 0; k &lt; n; k++) &#123; ... &#125;<br />
                                &#125;
                            </code>
                            <p>Space: O(1)</p>
                        </div>

                        <div className="complexity-card">
                            <h4>O(2ⁿ) - Exponential Time</h4>
                            <p>Example: Recursive Fibonacci</p>
                            <code>
                                fib(n) = fib(n-1) + fib(n-2)
                            </code>
                            <p>Space: O(n)</p>
                        </div>

                    </div>
                </div>
            )}

            <div className="center-footer">
                <p>
                    Made with <span role="img" aria-label="heart">❤️</span> in India - AR
                </p>
            </div>
        </div>
    );
}

export default App;
