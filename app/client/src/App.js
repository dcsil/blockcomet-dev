import logo from './logo.png';
import './App.css';
import {useState} from 'react' 
function App() {
  const [productName, setProductName] = useState('')
  const [manufacturerName, setManufacturerName] = useState('')
  const [productDetails, setProductDetails] = useState('')

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div className="App-input">
            <div>
            Product Name
          </div>
          <input value={productName} onInput={e => {setProductName(e.target.value)}}>
          </input>
          
          <button type="button" class="example-btn">
            Create Digital Asset 
          </button>
          </div>
        </header>
      </div>
    )
}

export default App;
