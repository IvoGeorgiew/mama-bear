import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./Pages/AdminPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<AdminPage />} />
        <Route exact path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
