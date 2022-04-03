import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import './css/App.css';
import { useState } from 'react'
import logo from './assets/blockcomet_logo_no_name.png';
import { Route, Link, BrowserRouter as Router, Routes } from "react-router-dom";
import { BsPlayCircle } from "react-icons/bs";
import useToken from './useToken'
import { useNavigate } from "react-router-dom";

function Home() {
    const [productID, setProductID] = useState('')
    const SEARCH_PLACEHOLDER = "Enter Product ID"
    const validateString = "Validate"
    const adminLoginString = "Admin Login"

    let navigate = useNavigate();
    const { token } = useToken();
    const onClickAdminLogin = () => {

        if (token === "" || token === undefined || token === null) {
            navigate('/login')
        }
        else {
            // TODO: Change to dashboard when ready
            navigate('/create')
        }
    }
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
                    <Button className="home-login-btn-txt" variant="primary" size="lg" data-testid="admin-login-btn" onClick={onClickAdminLogin}> {adminLoginString} <BsPlayCircle /> </Button>
                </div>
            </Container>

        </div>
    )
}

export default Home;
