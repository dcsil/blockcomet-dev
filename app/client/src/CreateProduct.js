import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import './css/CreateProduct.css';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { serverUrl } from './config'
import Navigationbar from './AdminNavigationbar';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import TextField from '@mui/material/TextField';
import useToken from './useToken'
import qs from 'qs';

function CreateProduct() {
    const { token } = useToken()
    let navigate = useNavigate();
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        console.log("Token from local", token)
        if (token === "" || token === undefined || token === null) {
            console.log(token)
            navigate('/login')
        }
    }, []);

    const [brand, setBrand] = useState('')
    const [productName, setProductName] = useState('')
    const [productId, setProductId] = useState('')
    const [dateOfPurchase, setDateOfPurchase] = useState('')

    // const [dataFields, setDataFields] = useState([{ key: "Brand", value: "Value", isDisabled: true },
    // { key: "Product Name", value: "Value", isDisabled: true }, { key: "Product ID", value: "Value", isDisabled: true }, { key: "Date of Purchase", value: "Value", isDisabled: true }
    // ])
    const [dataFields, setDataFields] = useState([])

    const handleFieldChange = (index, event) => {
        let data = [...dataFields]
        data[index][event.target.name] = event.target.value
        setDataFields(data)
    }

    const addField = () => {
        const newField = { "key": "", "value": "" }
        setDataFields([...dataFields, newField])
    }

    const removeField = (removeIndex) => {
        const updatedFields = [...dataFields]
        updatedFields.splice(removeIndex, 1)
        setDataFields(updatedFields)
    }

    const getProductID = async () => {
        return axios({
            method: 'get',
            url: `${serverUrl}/mock_unique_id`,
            headers: { "Authorization": `Bearer ${token}` }
        })
            .then((response) => {
                console.log("response", response)
                if (response.status == 200) {
                    return response.data.hashed_uid
                }
                return -1
            }).catch((err) => {
                console.log("error", err)
                return -1
            })
    }

    const onSubmit = async () => {
        const fixedData = [{
            "key": "Brand", "value": brand
        }, {
            "key": "Product Name", "value": productName
        }, {
            "key": "Product ID", "value": await getProductID()
        }, {
            "key": "Date of Purchase", "value": dateOfPurchase
        }]

        const requestData = [...fixedData, ...dataFields]
        console.log("Request Data", requestData)
        var data = qs.stringify({
            data: requestData
        });

        var config = {
            method: 'post',
            url: `${serverUrl}/create_product`,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                "Authorization": `Bearer ${token}`
            },
            data: {
                "data": requestData
            }
        };
        console.log("request data", data)
        axios(config)
            .then(function (response) {
                console.log(response)
                if (response.status == 200) {
                    //navigate("/sucess")
                }
            })
            .catch(function (error) {
                console.log("create product", error);
            });
    }
    return (
        <div className="CreateProduct" data-testid="create-product-container">
            <Navigationbar />
            <div className="create-prod-txt">
                Create New Product
            </div>
            <Container className="home-container">
                <Row className="data-field-row" >
                    <Col>
                        <TextField className="create-bar-key" data-testid="username-bar" name="key" label={"Brand"} disabled={true} onChange={(event) => { }} />
                    </Col>
                    <Col>
                        <TextField className="create-bar-value" data-testid="username-bar" name="value" label={"Value"} onChange={(event) => { setBrand(event.target.value) }} />
                    </Col>
                    <Col className="remove-icon-container">
                    </Col>
                </Row>
                <Row className="data-field-row" >
                    <Col>
                        <TextField className="create-bar-key" data-testid="username-bar" name="key" label={"Product Name"} disabled={true} onChange={(event) => { }} />
                    </Col>
                    <Col>
                        <TextField className="create-bar-value" data-testid="username-bar" name="value" label={"Value"} onChange={(event) => { setProductName(event.target.value) }} />
                    </Col>
                    <Col className="remove-icon-container">
                    </Col>
                </Row>
                <Row className="data-field-row" >
                    <Col>
                        <TextField className="create-bar-key" data-testid="username-bar" name="key" label={"Product ID"} disabled={true} onChange={(event) => { }} />
                    </Col>
                    <Col>
                        <TextField className="create-bar-value" data-testid="username-bar" name="value" label={"Value"} onChange={(event) => { setProductId(event.target.value) }} />
                    </Col>
                    <Col className="remove-icon-container">
                    </Col>
                </Row>
                <Row className="data-field-row" >
                    <Col>
                        <TextField className="create-bar-key" data-testid="username-bar" name="key" label={"Date of Purchase"} disabled={true} onChange={(event) => { }} />
                    </Col>
                    <Col>
                        <TextField className="create-bar-value" data-testid="username-bar" name="value" label={"Value"} onChange={(event) => { setDateOfPurchase(event.target.value) }} />
                    </Col>
                    <Col className="remove-icon-container">
                    </Col>
                </Row>
                {dataFields.map((input, index) => {
                    return (
                        <Row className="data-field-row" key={index}>
                            <Col>
                                <TextField className="create-bar-key" data-testid="username-bar" name="key" label={"New Field"} value={input.key} disabled={input.isDisabled} onChange={(event) => handleFieldChange(index, event)} />
                            </Col>
                            <Col>
                                <TextField className="create-bar-value" data-testid="username-bar" name="value" label={"Value"} value={input.value} onChange={(event) => handleFieldChange(index, event)} />
                            </Col>
                            <Col className="remove-icon-container">
                                <RemoveCircleIcon className="remove-icon" onClick={() => removeField(index)} />
                            </Col>
                        </Row>
                    )
                })
                }
                <div className="add-field-btn" data-testid="admin-login-btn-container">
                    <Button className="add-field-btn-txt" variant="primary" size="lg" data-testid="admin-login-btn" onClick={addField} > + Add New Field </Button>
                </div>

                <div className="" data-testid="admin-login-btn-container">
                    <Button className="submit-btn" variant="primary" size="lg" data-testid="admin-login-btn" onClick={onSubmit}> Submit </Button>
                </div>
            </Container>
        </div>
    )
}

export default CreateProduct;
