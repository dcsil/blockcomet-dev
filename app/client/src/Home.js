import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import './App.css';
import { useState } from 'react'
import logo from './assets/blockcomet_logo_no_name.png';
import { Link, Navigate, useNavigate  } from "react-router-dom";
import { BsPlayCircle } from "react-icons/bs";
import axios from 'axios';

function Home() {
    const [productID, setProductID] = useState('')
    const SEARCH_PLACEHOLDER = "Enter Product ID"
    const validateString = "Validate"
    const adminLoginString = "Admin Login"
    let navigate = useNavigate();

    const validateProduct = e => {
        e.preventDefault()
        const productID = e.target.form[0].value
        return navigate(`/validate/${productID}`)
        
    }

    return (
        <div className="Home">
            <Container className="home-container">
                <Form>
                    <Row className="align-items-center">
                        <Col className="align-items-right">
                            <img src={logo} className="logo-img" alt="logo" data-testid="logo" />
                        </Col>
                        <Col>
                            <Form.Control className="search-bar" size="lg" type="text" data-testid="search-bar" placeholder={SEARCH_PLACEHOLDER} />

                        </Col>
                        <Col>
                            <Button onClick={validateProduct} className="search-btn" variant="primary" size="lg" data-testid="search-btn"> {validateString} </Button>
                        </Col>
                    </Row>
                </Form>
                <div className="login-btn" data-testid="admin-login-btn-container">
                    <Link to="/login"> <Button className="login-btn-txt" variant="primary" size="lg" data-testid="admin-login-btn"> {adminLoginString} <BsPlayCircle /> </Button> </Link>
                </div>
            </Container>

        </div>
    )
}

export default Home;