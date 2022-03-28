import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import './App.css';
import { useState } from 'react'
import logo from './assets/blockcomet_logo_no_name.png';
import { Route, Link, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminLogin from "./AdminLogin"
import { BsPlayCircle } from "react-icons/bs";

function Home() {
    const [productID, setProductID] = useState('')
    const SEARCH_PLACEHOLDER = "Enter Product ID"

    return (
        <div className="Home">
            <Container>
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
                        <Link to="/login"> <Button className="search-btn" variant="primary" size="lg" data-testid="search-btn"> Validate </Button> </Link>
                    </Col>
                </Row>
                {/* <Link to="/login"> <Button className="search-btn" variant="primary" size="lg" data-testid="search-btn"> Admin Login <BsPlayCircle /> </Button> </Link> */}
            </Container>

        </div>
    )
}

export default Home;
