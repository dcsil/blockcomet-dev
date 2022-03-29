import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import './App.css';
import { useState } from 'react'
import logo from './assets/blockcomet_logo_no_name.png';
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";

function AdminLogin() {
    const [productName, setProductName] = useState('')
    const [manufacturerName, setManufacturerName] = useState('')
    const [productDetails, setProductDetails] = useState('')
    const SEARCH_PLACEHOLDER = "Enter Product ID"

    return (
        <div className="AdminLogin" data-testid="admin-login-container">
            <Container>
                <Row className="align-items-center">
                    <Col className="align-items-right">
                        <img src={logo} className="logo-img" alt="logo" data-testid="logo" />
                    </Col>
                    <Col>
                        <Form>
                            <Form.Control className="search-bar" size="lg" type="text" data-testid="email-bar" placeholder="Email" />
                            <Form.Control className="search-bar" size="lg" type="text" data-testid="password-bar" placeholder="Password" />
                        </Form>
                    </Col>
                    <Col>
                        <Button className="search-btn" variant="primary" size="lg" data-testid="login-btn"> Login </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AdminLogin;
