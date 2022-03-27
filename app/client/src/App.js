import logo from './blockcomet_logo_no_name.png';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSearch } from '@fortawesome/free-solid-svg-icons';
import './App.css';
import {useState} from 'react' 
function App() {
  const [productName, setProductName] = useState('')
  const [manufacturerName, setManufacturerName] = useState('')
  const [productDetails, setProductDetails] = useState('')

    return (
        <div className="App">        
          <Container>
            <Row className="align-items-center">
              <Col className="align-items-right">
                <img src={logo} className="logo-img" alt="logo" />
              </Col>
              <Col>
                {/* <input type="text" className="searchTerm" placeholder="Enter Product ID"/> */}
                <Form>
                <Form.Control className="search-bar" size="lg" type="text" placeholder="Enter Product ID"/>
                </Form>
              </Col>
              <Col> 
                <Button className="search-btn" variant="primary" size="lg"> Validate </Button>
              </Col>
            </Row>
          </Container>
        </div>
    )
}

export default App;
