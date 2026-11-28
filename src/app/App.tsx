import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import ProjectPage from "../pages/ProjectPage";
import ErrorBoundary from "./ErrorBoundary";
import "./App.css";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/:slug" element={<ProjectPage />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
