import { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Play = () => {
  const [code, setCode] = useState("// Write your JavaScript code here...");
  const [output, setOutput] = useState("No output yet.");
  const [isLoading, setIsLoading] = useState(false);
  const [problems, setProblems] = useState([]);
  const navigate = useNavigate(); // useNavigate hook
  const fetchProblems = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/problems");
      setProblems(response.data);
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  };

  const handleRunCode = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/execute", { code });
      setOutput(response.data.output);


      if (response.data.output.trim() === problems.output) {
        navigate("/nextpage"); // Navigate to the next page
      } else {
        alert("Answer is incorrect. Try again!");
      }
    } catch (error) {
      setOutput("Error: Unable to execute code. Check your backend.");
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    fetchProblems();
  }, []);

  return (
    <div className="play-container">
      <h1>Code Editor</h1>
      <div className="problem-list">
        {problems.map((problem, index) => (
          <div key={index} className="problem-card">
            <h2>{problem.title}</h2>
            <p>{problem.description}</p>
          </div>
        ))}
      </div>
      <div className="code-editor">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Write your code here..."
          rows="10"
          cols="50"
        ></textarea>
        <button onClick={handleRunCode} disabled={isLoading}>
          {isLoading ? "Running..." : "Run Code"}
        </button>
      </div>
      <div className="output">
        <h2>Output:</h2>
        <pre>{output}</pre>
      </div>
    </div>
  );
};

export default Play;
