FROM node:12-alpine

WORKDIR /usr/src/app

COPY package.json ./

RUN apk add --no-cache git

RUN npm i --production

COPY . .

CMD [ "npm", "start" ]
