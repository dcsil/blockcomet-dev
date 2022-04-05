#!/usr/bin/env bash

docker build -t client ./
docker run -p 3001:3000 client
