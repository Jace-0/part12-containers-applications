FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

# Install nodemon for development
RUN npm install -g nodemon

CMD ["nodemon", "./index.js"]