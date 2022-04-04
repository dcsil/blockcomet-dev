import { Navbar, Button, Container } from 'react-bootstrap';
import './css/Navigationbar.css';
import logo from './assets/blockcomet_logo_no_name.png';
import { Link } from "react-router-dom";
import axios from 'axios'
import { serverUrl } from './config'
import useToken from './useToken'

function Navigationbar(props) {
    const { token } = useToken()
    const onLogout = () => {
        localStorage.removeItem('token')
        axios({
            method: 'get',
            url: `${serverUrl}/logout`,
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then((response) => {
                console.log("logout response", response)
            }).catch((err) => {
                console.log("logout error", err)
            })
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