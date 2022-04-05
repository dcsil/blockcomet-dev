import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import './css/App.css';
import logo from './assets/blockcomet_logo_no_name.png';
import { useNavigate } from "react-router-dom";
import { BsPlayCircle } from "react-icons/bs";
import useToken from './useToken'
import { getLogo } from './helpers'

function Home() {
    const SEARCH_PLACEHOLDER = "Enter Product ID"
    const validateString = "Validate"
    const adminLoginString = "Admin Login"
    const dashboard = "Dashboard"
    let navigate = useNavigate();
    const validateProduct = e => {
        e.preventDefault()
        const productID = e.target.form[0].value
        if (!productID) {
            alert('Please enter a Product ID')
        }
        else {
            return navigate(`/validate/${productID}`)
        }
    }
    const { token } = useToken();
    const onClickAdminLogin = () => {
        if (token === "" || token === undefined || token === null) {
            navigate('/login')
        }
        else {
            navigate('/dashboard')
        }
    }
    return (
        <div className="Home">
            <Container className="home-container">
                <Form>
                    <Row className="align-items-center">
                        <Col className="align-items-right">
                            {getLogo("logo-img")}
                        </Col>
                        <Col>
                            <Form.Control className="search-bar" size="lg" type="text" data-testid="search-bar" placeholder={SEARCH_PLACEHOLDER} />
                        </Col>
                        <Col>
                            <Button onClick={validateProduct} className="search-btn" variant="primary" size="lg" data-testid="search-btn"> {validateString} </Button>
                        </Col>
                    </Row>
                </Form>
                <div className="home-login-btn" data-testid="admin-login-btn-container">
                    <Button className="home-login-btn-txt" variant="primary" size="lg" data-testid="admin-login-btn" onClick={onClickAdminLogin}> {token ? dashboard : adminLoginString} <BsPlayCircle /> </Button>
                </div>
            </Container>
        </div>
    )
}

export default Home;
