import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import './css/AdminLogin.css';
import { useState } from 'react'
import logo from './assets/blockcomet_logo_no_name.png';
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Stack, } from '@mui/material';

function AdminLogin() {
    const [productName, setProductName] = useState('')
    const [manufacturerName, setManufacturerName] = useState('')
    const [productDetails, setProductDetails] = useState('')

    return (
        <div className="AdminLogin" data-testid="admin-login-container">
            <Stack justifyContent="center"
                alignItems="center"
                spacing={3} className="admin-login-stack">
                <div classname="login-logo">
                    <img src={logo} className="login-logo-img" alt="logo" data-testid="logo" />
                </div>
                <div className="login-form">
                    <Form>
                        <Form.Control className="search-bar" size="lg" type="text" data-testid="username-bar" placeholder="Username" />
                        <Form.Control className="search-bar" size="lg" type="text" data-testid="password-bar" placeholder="Password" />
                    </Form>
                </div>
                <div className="login-btn-container">
                    <Button className="search-btn" variant="primary" size="lg" data-testid="login-btn"> Login </Button>
                </div>
            </Stack>
        </div>
    )
}

export default AdminLogin;
