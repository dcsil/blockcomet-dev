#!/bin/bash

sudo docker build -t server ./
sudo docker run -p 5001:8080 server 
