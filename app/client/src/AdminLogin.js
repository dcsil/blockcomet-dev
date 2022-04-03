import { Form, Button } from 'react-bootstrap';
import './css/AdminLogin.css';
import { useState } from 'react'
import logo from './assets/blockcomet_logo_no_name.png';
import { useNavigate } from "react-router-dom";
import { Stack, } from '@mui/material';
import axios from 'axios'
import { serverUrl } from './config'
import qs from 'qs';
import useToken from './useToken'

function AdminLogin() {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    let navigate = useNavigate();
    const updateUsername = (event) => {
        setUserName(event.target.value)
    }
    const updatePassword = (event) => {
        setPassword(event.target.value)
    }

    const loginUser = async () => {

        var data = qs.stringify({
            'grant_type': '',
            'username': username,
            'password': password,
            'scope': '',
            'client_id': '',
            'client_secret': ''
        });
        var config = {
            method: 'post',
            url: `${serverUrl}/login`,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
        };
        return axios(config)
            .then(function (response) {
                console.log(response)
                return response
            })
            .catch(function (error) {
                console.log(error);
                return error
            });
    }
    const { token, setToken } = useToken();
    const onLogin = async () => {
        const tokenResponse = await loginUser()
        console.log("token", tokenResponse)
        if (tokenResponse.status == 200) {
            setToken(tokenResponse.data?.access_token)
            navigate(`/create`);
        }
        else {
            alert("Incorrect Username/Password, please try to login again")
        }
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
                    {/* Temporarily redirect to create page, after auth need to shift to dashboard when created */}
                    <Button className="login-btn" variant="primary" size="lg" data-testid="login-btn" onClick={onLogin} > {loginString} </Button>
                </div>
            </Stack>
        </div>
    )
}

export default AdminLogin;
