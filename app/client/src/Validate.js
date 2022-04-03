import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import './css/Validate.css';
import { useState } from 'react'
import { useParams } from "react-router-dom"
import Navigationbar from './Navigationbar'
import success from './assets/success.png';
import failure from './assets/failure.png';

function Success(props) {
    return <h1>Welcome back!</h1>;
}

function Failure(props) {
    return ( 
        <div className="Validation">
            <Container className="align-items-center">  
                    <img src={failure} className="failure-img" alt="failure" data-testid="failure" />
                    <i><h4>Unable to verify authenticity of product <b>{props.productID}</b></h4></i>
            </Container>
        </div>    
    )
}

function Validate() {
    const [productName, setProductName] = useState('')
    const [manufacturerName, setManufacturerName] = useState('')
    const [productDetails, setProductDetails] = useState('')
    let params = useParams()
    const productID = params.id;
    // Make API Call with productID
    // axios.get(`https://blockcometapi-6dkam7pfeq-uc.a.run.app/`)
    // .then(res => {
    // })
    const res = {"statusCode": 404, "ID": 1, "Manufacturer": "Rolex SA", "Product Name": "Submariner", "Warranty Information": "1 Year - Basic", "Date of Purchase": "27 Feb 2022"}

    if (res.statusCode == 200) {
        return <Success productDetails={res}/>;
    }
    return (
        <div>
        <Navigationbar backPage="/"/>
        <Failure productID={productID}/>
        </div>

    )
}

export default Validate;
