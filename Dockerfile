FROM node:10.14.0

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/

RUN npm install -g yarn

RUN yarn config set registry 'https://registry.npm.taobao.org'

RUN yarn install

COPY . /usr/src/app

EXPOSE 3000
