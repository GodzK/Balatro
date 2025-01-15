import { useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div className="menu">
        <button id="play">
          <Link to="/play">
            <p>Play</p>
          </Link>
        </button>
        <button id="option">
          <Link to="/option">
            <p>Option</p>
          </Link>
         
        </button>
        <button id="quit">
          <Link to="/quit">
            <p>Quit</p>
          </Link>
          
        </button>
        <button id="collection">
          <Link to="/collection">
            <p>Collection</p>
          </Link>
        </button>
      </div>
    </div>
  );
}

export default App;
