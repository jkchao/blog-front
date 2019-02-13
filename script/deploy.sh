#!/bin/bash

cd /home/front-back/

echo 'git pull'

git pull

echo 'yarn install'

yarn install

echo 'npm run build'

npm run build

echo 'pm2 restart all'

pm2 restart all

echo 'deploy done'