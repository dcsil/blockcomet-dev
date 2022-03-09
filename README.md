# BlockComet Developer's Guide

## Setup Instructions

### Prerequisites
Instructions for Mac, Windows, Linux
- [Docker](https://docs.docker.com/get-docker/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Installation and Usage
1\. Clone this [repository](https://github.com/dcsil/blockcomet-dev)

```
git clone https://github.com/dcsil/blockcomet-dev
```


2\. Build a new docker container image (Ensure you are in the root folder)

```
docker build -t blockComet ./
```

3\. Run the docker container
```
docker run blockComet
```

#### (Optional) Running tests
Without coverage
```
docker run blockComet yarn run test
```
## Resources
[BlockComet - Google Drive](https://drive.google.com/drive/folders/1Y2Rrer1_6Pn5j8HI7jxWZaM5FnN1wZ13)
