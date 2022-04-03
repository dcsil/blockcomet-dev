import { Form, Button } from 'react-bootstrap';
import './css/AdminLogin.css';
import { useState, useEffect } from 'react'
import logo from './assets/blockcomet_logo_no_name.png';
import { useNavigate } from "react-router-dom";
import { Stack, } from '@mui/material';
import axios from 'axios'
import { serverUrl } from './config'
import Navigationbar from './AdminNavigationbar';

function CreateProduct() {

    let navigate = useNavigate();
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        console.log("Token from local", token)
        if (token === "" || token === undefined || token === null) {
            console.log(token)
            navigate('/login')
        }
    }, []);


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
        <div className="CreateProduct" data-testid="create-product-container">
            <Navigationbar />
            <div className="create-prod-txt">
                Create New Product
            </div>
            <Stack justifyContent="center"
                alignItems="center"
                spacing={3} className="admin-login-stack">

                <div className="login-form">
                    <Form>
                        <Form.Control className="search-bar" size="lg" type="text" data-testid="username-bar" placeholder="Product Name" onChange={updateUsername} />
                        <Form.Control className="search-bar" size="lg" type="password" data-testid="password-bar" placeholder="Date of Purchase" onChange={updatePassword} />
                    </Form>
                </div>
            </Stack>
        </div>
    )
}

export default CreateProduct;
