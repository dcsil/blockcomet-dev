import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import './App.css';
import {useState} from 'react' 
import logo from './assets/blockcomet_logo_no_name.png';

function App() {
  const [productName, setProductName] = useState('')
  const [manufacturerName, setManufacturerName] = useState('')
  const [productDetails, setProductDetails] = useState('')
  const SEARCH_PLACEHOLDER = "Enter Product ID"

    return (
        <div className="App">        
          <Container>
            <Row className="align-items-center">
              <Col className="align-items-right">
                <img src={logo} className="logo-img" alt="logo" data-testid="logo"/>
              </Col>
              <Col>
                <Form>
                <Form.Control className="search-bar" size="lg" type="text" data-testid="search-bar" placeholder={SEARCH_PLACEHOLDER}/>
                </Form>
              </Col>
              <Col> 
                <Button className="search-btn" variant="primary" size="lg" data-testid="search-btn">  Validate </Button>
              </Col>
            </Row>
          </Container>
        </div>
    )
}

export default App;
