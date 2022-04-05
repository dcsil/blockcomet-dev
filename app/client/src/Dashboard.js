import './css/Dashboard.css';
import { useState, useEffect } from 'react'
import paginationFactory from 'react-bootstrap-table2-paginator';
import { useNavigate } from "react-router-dom";
import axios from 'axios'
import { serverUrl } from './config'
import Navigationbar from './AdminNavigationbar';
import BootstrapTable from 'react-bootstrap-table-next';

function Dashboard() {
    let navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('token'));
        if (token === "" || token === undefined || token === null) {
            console.log(token)
            navigate('/login')
        }
        var config = {
            method: 'get',
            url: `${serverUrl}/get_products`,
            headers: { "Authorization": `Bearer ${token}` }
        };
        try {
            axios(config)
                .then(function (response) {
                    console.log(response)
                    let product_details = []
                    for (let i = 0; i < response.data.length; i++) {
                        let product_entry = {}
                        for (let j = 0; j < response.data[i].data.product_data.length; j++) {
                            product_entry[response.data[i].data.product_data[j].key] = response.data[i].data.product_data[j].value
                        }
                        product_details.push(product_entry)
                    }
                    setProducts(product_details);
                })
        }
        catch (err) {
            console.log(err);
        }

    }, []);

    const columns = [
        { text: 'ID', dataField: 'Product ID' },
        { text: 'Brand', dataField: 'Brand' },
        { text: 'Product Name', dataField: 'Product Name' },
        { text: 'Date', dataField: 'Date of Purchase' }
    ];
    return (
        <div>
            <Navigationbar />
            <div className="Dashboard" data-testid="create-product-container">
                <h4> <b>Products</b> </h4>
                <h5 onClick={() => { navigate('/create') }}> Add Product </h5>
                <h5 onClick={() => { navigate('/') }} >  Validate Product </h5>
            </div>
            <BootstrapTable striped bordered hover columns={columns} data={products} keyField='ID' pagination={paginationFactory()} />
        </div>
    )
}

export default Dashboard;
