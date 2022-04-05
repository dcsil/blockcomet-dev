import { Container, } from 'react-bootstrap';
import './css/Validate.css';
import { useParams } from "react-router-dom"
import Navigationbar from './AdminNavigationbar'
import success from './assets/success.png';
import failure from './assets/failure.png';
import BootstrapTable from 'react-bootstrap-table-next';

function Success(props) {
    const products = [props.productDetails.data]
    const columns = [
        { text: 'UID', dataField: 'UID' },
        { text: 'Company', dataField: 'company' },
        { text: 'Manufacturer', dataField: 'manufacturer' },
        { text: 'Model', dataField: 'model' }
    ];

    return (
        <div className="Success">
            <Container className="align-items-center">
                <img src={success} className="success-img" alt="success" data-testid="success" />
                <i><h4>Verified by <b>{props.productDetails.data.manufacturer}</b></h4></i>
                <BootstrapTable columns={columns} data={products} keyField='uid' />
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

function Validate() {
    let params = useParams()
    const productID = params.id;
    // Make API Call with productID
    // axios.get(`https://blockcometapi-6dkam7pfeq-uc.a.run.app/`)
    // .then(res => {
    // })
    const res = {
        'data':
        {
            'company': 'blockcomet',
            'manufacturer': 'Rolex SA',
            'model': 'Submariner',
            'UID': '123'
        },
        'statusCode': 200
    }
    if (res.statusCode == 200) {
        return (
            <div>
                <Navigationbar backPage="/" />
                <Success productDetails={res} />
            </div>
        )
    }
    return (
        <div>
            <Navigationbar backPage="/" />
            <Failure productID={productID} />
        </div>
    )
}

export default Validate;
