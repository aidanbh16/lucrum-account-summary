FROM node:25

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=8082

EXPOSE 8082

CMD ["npm", "start"]
