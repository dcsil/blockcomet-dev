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
import { getLogo } from './helpers'

const getFormFields = (setUserName, setPassword) => {
    const data = [{
        type: "text",
        testId: "username-bar",
        placeholder: "Username",
        onChange: event => setUserName(event.target.value)
    }, {
        type: "password",
        testId: "password-bar",
        placeholder: "Password",
        onChange: event => setPassword(event.target.value),
    }]
    return (
        <Form>
            {data.map((input) =>
                <Form.Control className="search-bar" size="lg" type={input.type} data-testid={input.testId} placeholder={input.placeholder} onChange={input.onChange} />
            )}
        </Form>
    )
}

function AdminLogin() {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')

    let navigate = useNavigate();

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
            .then((response) => {
                return response
            })
            .catch(function (error) {
                console.log(error);
                return error
            });
    }
    const { setToken } = useToken();
    const onLogin = async () => {
        const tokenResponse = await loginUser()
        if (tokenResponse.status == 200) {
            setToken(tokenResponse.data?.access_token)
            navigate(`/dashboard`);
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
                    {getLogo("login-logo-img")}
                </div>
                <div className="login-form">
                    {getFormFields(setUserName, setPassword)}
                </div>
                <div className="login-btn-container">
                    <Button className="login-btn" variant="primary" size="lg" data-testid="login-btn" onClick={onLogin} > {loginString} </Button>
                </div>
            </Stack>
        </div>
    )
}

export default AdminLogin;
