import { Container } from 'react-bootstrap';
import './css/Validate.css';
import React from "react";
import axios from 'axios';
import { serverUrl } from './config';
import Navigationbar from './Navigationbar';
import success from './assets/success.png';
import failure from './assets/failure.png';
import BootstrapTable from 'react-bootstrap-table-next';

function Success(props) {
    const columns = [{'text': 'hi', 'dataField': 'hi'},
                    {'text': 'yo', 'dataField': 'yo'}]
    const productDetails = [{'hi': 1, 'yo': 2}]
    return ( 
        <div className="Success">
            <Container className="align-items-center">  
                    <img src={success} className="success-img" alt="success" data-testid="success" />
                    <i><h4>Verified by <b>{props.productDetails[0].Brand}</b></h4></i>
                    <BootstrapTable columns={props.columns} data={props.productDetails} keyField='Product ID' />
            </Container>
        </div>   
    )
}

function Failure(props) {
    return ( 
        <div className="Failure">
            <Container className="align-items-center">  
                    <img src={failure} className="failure-img" alt="failure" data-testid="failure" />
                    <i><h4>Unable to verify authenticity of product <b>{props.productID}</b></h4></i>
            </Container>
        </div>    
    )
}

class Validate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productID: window.location.pathname.substring(10),
            status: null,
            productDetails: null,
            columns: null,
        };
    }
    componentDidMount() {
        this.loadData();
    }

    loadData() {
        axios.get(`${serverUrl}/get_product/${this.state.productID}`)
        .then(res => {
            if (res.status == 200) {
                const productInfo = {};
                const columns = [];
                for (let i = 0; i < res.data.data.product_data.length; i++) {
                    productInfo[res.data.data.product_data[i].key] = res.data.data.product_data[i].value;
                    columns.push({'text': res.data.data.product_data[i].key, 'dataField': res.data.data.product_data[i].key});
                }
                this.setState({
                    status: 'Success',
                    productDetails: [productInfo],
                    columns: columns
                });
            }
        }).catch((error) => {
            this.setState({
                status: 'Failure'
            });
        })
    }

    render() {
        if (!this.state.status) {
            return <div />
        }
        else if (this.state.status === 'Success') {
            return (
                <div>
                <Navigationbar backPage="/"/>
                <Success productDetails={this.state.productDetails} columns={this.state.columns}/>
                </div>
            )
        }
        else if (this.state.status === 'Failure') {
            return (
                <div>
                <Navigationbar backPage="/"/>
                <Failure productID={this.state.productID}/>
                </div>
            )
        }
    }
}

export default Validate;
