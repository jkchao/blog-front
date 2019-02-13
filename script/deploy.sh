#!/bin/bash

cd /home/front-back/

echo 'git pull'

git pull

docker-compose -f docker-compose.yml build
docker-compose -f docker-compose.yml up -d


