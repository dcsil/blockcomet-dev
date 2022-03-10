# BlockComet Developer's Guide

## Setup Instructions

### Prerequisites
Instructions for Mac, Windows, Linux
- [Docker](https://docs.docker.com/get-docker/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Installation and Usage (Local Development)
1\. Clone this [repository](https://github.com/dcsil/blockcomet-dev)

```
git clone https://github.com/dcsil/blockcomet-dev
```


2\. Run bin/bootstrap (Ensure you are in the root folder)             

This should install the languages and front & backend dependencies 
```
./bin/bootstrap
```

3\. Go to app/client and run the start_app script 

https://localhost:3001 should have the web app
```
./app/client/start_app
```
4\. Go to app/server and run the following commands: 
```
poetry shell
poetry install 
poetry run python ./src/main.py
```

#### (Optional) Running tests
For all tests (From root folder):
``` 
./bin/test
```

1. webapp tests (Ensure inside client folder):
```
yarn test
```
2. server tests (Ensure inside server folder):
```
poetry run pytest
```

## Resources
[BlockComet - Google Drive](https://drive.google.com/drive/folders/1Y2Rrer1_6Pn5j8HI7jxWZaM5FnN1wZ13)
