import { Navbar, Nav, Container } from 'react-bootstrap';
import './css/Navigationbar.css';
import { useState } from 'react'
import logo from './assets/blockcomet_logo_no_name.png';
import { Link } from "react-router-dom";
import { BsArrowLeftShort } from "react-icons/bs";

function Navigationbar(props) {
    const [productName, setProductName] = useState('')
    const [manufacturerName, setManufacturerName] = useState('')
    const [productDetails, setProductDetails] = useState('')
    const page = props.backPage
    return (
        <Navbar bg="light" expand="lg">
            <Link to="/"><BsArrowLeftShort id="navbar-back" /></Link>
            <Container id="bc-navbar">
            <img src={logo} className="logo-navbar" alt="logo" data-testid="logo" />
            <Navbar.Brand id="text-navbar">BlockComet</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Navigationbar;
