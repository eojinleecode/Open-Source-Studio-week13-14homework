
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import List from "./components/Pages/List";
import Detail from "./components/Pages/Detail";
import Update from "./components/Pages/Update";

function App() {
  return (
    <Router>
      <div className="container mt-4">
        <h1 className="mb-4">Student Management</h1>
        <Routes>
          {}
          <Route path="/" element={<List />} />
          <Route path="/list" element={<List />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
