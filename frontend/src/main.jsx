import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  BrowserRouter,
  Routes, Route

} from "react-router-dom";
import App from './App.jsx'
import Play from './pages/Play.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
  {/* <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
      <li>
        <Link to="/contact">Contact</Link>
      </li>
    </ul>
  </nav> */}
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="/play" element={<Play />} />
  </Routes>
</BrowserRouter>
  </StrictMode>,
)
