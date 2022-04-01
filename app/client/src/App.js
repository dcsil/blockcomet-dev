import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AdminLogin from "./AdminLogin"
import Home from "./Home"
import CreateProduct from './CreateProduct'
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
          <Route path="create" element={<CreateProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
