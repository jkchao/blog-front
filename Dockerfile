
FROM node:10.14.0

RUN mkdir -p /usr/src/blog-front

WORKDIR /usr/src/blog-front

ADD package.json /usr/src/blog-front

ADD yarn.lock /usr/src/blog-front

RUN npm i yarn -g

RUN yarn

ADD . /usr/src/blog-front



