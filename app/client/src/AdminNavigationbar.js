import { Navbar, Button, Container } from 'react-bootstrap';
import './css/Navigationbar.css';
import logo from './assets/blockcomet_logo_no_name.png';
import { Link } from "react-router-dom";

function Navigationbar(props) {

    const onLogout = () => {
        localStorage.removeItem('token')
    }

    return (
        <Navbar bg="light" expand="lg">
            <Link to="/"><Button className="logout-btn" variant="primary" size="lg" data-testid="logout-btn" onClick={onLogout}> Logout </Button></Link>
            <Container id="bc-navbar">
                <img src={logo} className="logo-navbar" alt="logo" data-testid="logo" />
                <Navbar.Brand id="text-navbar">BlockComet</Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default Navigationbar;