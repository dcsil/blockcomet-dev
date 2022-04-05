import { Button, Container, Row, Col } from 'react-bootstrap';
import './css/CreateProduct.css';
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { serverUrl } from './config'
import Navigationbar from './AdminNavigationbar';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import TextField from '@mui/material/TextField';
import useToken from './useToken'
import { makeGetReq } from './helpers'

function CreateProduct() {
    const { token } = useToken()
    let navigate = useNavigate();
    useEffect(async () => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token === "" || token === undefined || token === null) {
            console.log(token)
            navigate('/login')
        }
        else {
            //update product id 
            const productData = [...dataFields]
            productData[2].value = await getProductID()
            setDataFields(productData)
        }
    }, []);
    const [dataFields, setDataFields] = useState([{ "key": "Brand", "value": "" }, {
        "key": "Product Name", "value": ""
    }, { "key": "Product ID", "value": "" },
    { "key": "Date of Production", "value": "" }])

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
        const response = await makeGetReq('mock_unique_id', token)
        return response.data.hashed_uid
    }

    const onSubmit = async () => {
        var config = {
            method: 'post',
            url: `${serverUrl}/create_product`,
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            data: {
                data: dataFields
            }
        };
        axios(config)
            .then(function (response) {
                if (response.status == 200) {
                    const id = response.data.substring(response.data.lastIndexOf(':') + 2)
                    navigate(`/validate/${id}`)
                }
            }).catch(function (error) {
                alert("Failed to Create Product, Please Try Again!")
            });
    }
    return (
        <div className="CreateProduct" data-testid="create-product-container">
            <Navigationbar />
            <div className="create-prod-txt">Create New Product</div>
            <Container className="home-container">
                {dataFields.map((input, index) => {
                    return (
                        <Row className="data-field-row" key={index}>
                            <Col>
                                <TextField className="create-bar-key" data-testid={`create-bar-key-${index}`} name="key" label={"New Field"} value={input.key} disabled={index < 4 ? true : false} onChange={(event) => handleFieldChange(index, event)} />
                            </Col>
                            <Col>
                                <TextField className="create-bar-value" data-testid={`create-bar-value-${index}`} name="value" label={"Value"} disabled={index == 2 ? true : false} value={input.value} onChange={(event) => handleFieldChange(index, event)} />
                            </Col>
                            <Col className="remove-icon-container">
                                {index > 3 && <RemoveCircleIcon className="remove-icon" onClick={() => removeField(index)} />}
                            </Col>
                        </Row>
                    )
                })
                }
                <div className="add-field-btn" data-testid="add-field-container">
                    <Button className="add-field-btn-txt" variant="primary" size="lg" data-testid="add-field-btn-txt" onClick={addField} > + Add New Field </Button>
                </div>
                <Button className="submit-btn" variant="primary" size="lg" data-testid="create-submit" onClick={onSubmit}> Submit </Button>
            </Container>
        </div>
    )
}

export default CreateProduct;
