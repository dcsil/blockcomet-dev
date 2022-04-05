import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AdminLogin from "./AdminLogin";
import Home from "./Home";
import Validate from './Validate';
import CreateProduct from './CreateProduct';
import Dashboard from './Dashboard';
import { useEffect } from 'react';
import React from "react";

function App() {
  useEffect(() => {
    document.title = "BlockComet"
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<AdminLogin />} />
          <Route path="validate/:id" element={<Validate />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="create" element={<CreateProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
