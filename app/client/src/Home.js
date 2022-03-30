import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import './css/App.css';
import { useState } from 'react'
import logo from './assets/blockcomet_logo_no_name.png';
import { Route, Link, BrowserRouter as Router, Routes } from "react-router-dom";
import { BsPlayCircle } from "react-icons/bs";

function Home() {
    const [productID, setProductID] = useState('')
    const SEARCH_PLACEHOLDER = "Enter Product ID"
    const validateString = "Validate"
    const adminLoginString = "Admin Login"
    return (
        <div className="Home">
            <Container className="home-container">
                <Row className="align-items-center">
                    <Col className="align-items-right">
                        <img src={logo} className="logo-img" alt="logo" data-testid="logo" />
                    </Col>
                    <Col>
                        <Form>
                            <Form.Control className="search-bar" size="lg" type="text" data-testid="search-bar" placeholder={SEARCH_PLACEHOLDER} />
                        </Form>
                    </Col>
                    <Col>
                        <Button className="search-btn" variant="primary" size="lg" data-testid="search-btn"> {validateString} </Button>
                    </Col>
                </Row>
                <div className="home-login-btn" data-testid="admin-login-btn-container">
                    <Link to="/login"> <Button className="home-login-btn-txt" variant="primary" size="lg" data-testid="admin-login-btn"> {adminLoginString} <BsPlayCircle /> </Button> </Link>
                </div>
            </Container>

        </div>
    )
}

export default Home;
