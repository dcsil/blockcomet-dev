import { Form, Button } from 'react-bootstrap';
import './css/AdminLogin.css';
import { useState } from 'react'
import logo from './assets/blockcomet_logo_no_name.png';
import { Route, Link, BrowserRouter as Router, Switch } from "react-router-dom";
import { Stack, } from '@mui/material';

function AdminLogin() {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    const updateUsername = (event) => {
        setUserName(event.target.value)
    }
    const updatePassword = (event) => {
        setPassword(event.target.value)
        console.log(password)
    }
    const loginString = "Log In"
    return (
        <div className="AdminLogin" data-testid="admin-login-container">
            <Stack justifyContent="center"
                alignItems="center"
                spacing={3} className="admin-login-stack">
                <div className="login-logo">
                    <img src={logo} className="login-logo-img" alt="logo" data-testid="logo" />
                </div>
                <div className="login-form">
                    <Form>
                        <Form.Control className="search-bar" size="lg" type="text" data-testid="username-bar" placeholder="Username" onChange={updateUsername} />
                        <Form.Control className="search-bar" size="lg" type="password" data-testid="password-bar" placeholder="Password" onChange={updatePassword} />
                    </Form>
                </div>
                <div className="login-btn-container">
                    <Button className="login-btn" variant="primary" size="lg" data-testid="login-btn"> {loginString} </Button>
                </div>
            </Stack>
        </div>
    )
}

export default AdminLogin;
