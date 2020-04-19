FROM node:12.8.0 as builder
WORKDIR /app

COPY package.json .
RUN npm install 
COPY . .

CMD ["npm", "run", "server"]