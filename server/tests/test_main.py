import json
from pydoc import cli
from urllib import response
from fastapi import FastAPI
from fastapi.testclient import TestClient
from server.main import app
from pytest import fixture

client = TestClient(app)
unique_ids = [client.get('/mock_unique_id').json()['hashed_uid'], client.get('/mock_unique_id').json()['hashed_uid'], client.get('/mock_unique_id').json()['hashed_uid']]

@fixture
def valid_product():
    valid_product = {"data": [{"key": "Brand", "value": "test"}, {"key": "Product Name", "value": "valid test 1"}, {"key": "Product ID", "value": unique_ids[0]}]}
    return json.dumps(valid_product)

@fixture
def valid_product2():
    valid_product = {"data": [{"key": "Brand", "value": "test"}, {"key": "Product Name", "value": "valid test 1"}, {"key": "Product ID", "value": unique_ids[2]}]}
    return json.dumps(valid_product)

@fixture
def unauth_product():
    unauth_product = {
        "data": [
            {
                "key": "Brand",
                "value": "rolex"
            },
            {
                "key": "Product Name",
                "value": "valid test 1"
            },
            {
                "key": "Product ID",
                "value": unique_ids[1]
            }
        ]
    }
    return json.dumps(unauth_product)

def test_get_login_token():
    payload='grant_type=&username=test&password=test123&scope=&client_id=&client_secret='
    headers = {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
        }
    response = client.post("/login", headers=headers, data=payload)
    assert response.ok
    return response.json()

def test_get_invalid_login_token():
    payload='grant_type=&username=test&password=test12345456&scope=&client_id=&client_secret='
    headers = {
        'accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
        }
    response = client.post("/login", headers=headers, data=payload)
    assert not response.ok
    return response.status_code == 400

login_token = test_get_login_token()['access_token']
auth_header = {'Authorization': f'Bearer {login_token}'}
unauth_header = {'Authorization': f'Bearer {login_token}12'}
manufacturer_product_num = len(client.get("/get_products", headers=auth_header).json())


def test_authenticated():
    response = client.get("/me", headers=auth_header)
    assert response.json() == 'test'

def test_valid_create(valid_product):
    response = client.post("/create_product", headers=auth_header, data=valid_product)
    assert response.ok
    assert 'Added' in response.json()

def test_unauth_create(unauth_product):
    response = client.post("/create_product", headers=auth_header, data=unauth_product)
    assert response.status_code == 401

def test_get_product():
    response = client.get(f"/get_product/{unique_ids[0]}")
    assert response.ok
    assert response.json()['data']['added_by'] == 'blockcomet_mvp'

def test_get_absent_product():
    response = client.get(f"/get_product/cduhcdhcdofherfp")
    assert not response.ok
    assert response.status_code == 404

def test_get_by_manufacturer():
    response = client.get("/get_products", headers=auth_header)
    assert response.ok
    assert len(response.json()) - manufacturer_product_num == 1

def test_valid_create2(valid_product2):
    response = client.post("/create_product", headers=auth_header, data=valid_product2)
    assert response.ok
    assert 'Added' in response.json()

def test_get_by_manufacturer_2():
    response = client.get("/get_products", headers=auth_header)
    assert response.ok
    assert len(response.json()) - manufacturer_product_num == 2

def test_unauthenticated():
    response = client.get("/me", headers=unauth_header)
    assert response.status_code == 401

def test_get_by_manufacturer_unauth():
    response = client.get("/get_products", headers=unauth_header)
    assert response.status_code == 401

def test_bad_create(valid_product2):
    response = client.post("/create_product", headers=unauth_header, data=valid_product2)
    assert not response.ok
    assert response.status_code == 401

def test_mock_uid():
    response = client.get("/mock_unique_id")
    assert response.ok
    assert "hashed_uid" in response.json()

def test_root():
    response = client.get("/")
    assert response.ok
    assert 'blockcomet' in response.json().lower()