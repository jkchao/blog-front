#!/bin/bash

# service 还是使用 pm2
pm2 stop service

docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up -d

pm2 restart service
