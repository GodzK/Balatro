import { useState, useEffect } from 'react';
import axios from "axios";
const Play = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    // Fetch problems from backend
    fetch("http://localhost:8000/api/problems").then((response) => {
      setProblems(response.data);
    });
  }, []);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="Play">
      {isLoading ? (
       <div className="loader"> 
       <span>L</span>
       <span>o</span>
       <span>a</span>
       <span>d</span>
       <span>i</span>
       <span>n</span>
       <span>g</span>
       <span>.</span>
       <span>.</span>
       <span>.</span>
     </div>
      ) : (
        <div className="App">
        <h1>Coding Problems</h1>
        <div className="problem-list">
          {problems.map((problem, index) => (
            <div key={index} className="problem-card">
              <h2>{problem.title}</h2>
              <p>{problem.description}</p>
              <p>Difficulty: {problem.difficulty}</p>
            </div>
          ))}
        </div>
      </div>
      )}
    </div>
  );
};

export default Play;
