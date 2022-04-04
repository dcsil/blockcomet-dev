import { Navbar, Button, Container } from 'react-bootstrap';
import './css/Navigationbar.css';
import logo from './assets/blockcomet_logo_no_name.png';
import { Link } from "react-router-dom";
import useToken from './useToken'
import { makeGetReq } from './helpers'

function Navigationbar(props) {
    const { token } = useToken()
    const onLogout = () => {
        localStorage.removeItem('token')
        makeGetReq('logout', token)
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container id="bc-navbar">
                <img src={logo} className="logo-navbar" alt="logo" data-testid="logo" />
                <Navbar.Brand id="text-navbar">BlockComet</Navbar.Brand>
            </Container>
            <Link to="/"><Button className="logout-btn" variant="primary" size="lg" data-testid="logout-btn" onClick={onLogout}> Logout </Button></Link>
        </Navbar>
    )
}

export default Navigationbar;