<<<<<<< HEAD
FROM node:17-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

=======
FROM node:17-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

>>>>>>> 8b96d5c184f2df0787423dbab436cdc8f683ed87
CMD ["npm", "start"]