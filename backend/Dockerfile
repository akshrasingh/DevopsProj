FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install && chmod +x ./node_modules/.bin/jest

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]
