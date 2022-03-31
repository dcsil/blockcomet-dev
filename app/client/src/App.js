import './css/App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AdminLogin from "./AdminLogin"
import Home from "./Home"

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<AdminLogin />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
