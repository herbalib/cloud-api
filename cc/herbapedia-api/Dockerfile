FROM node:18.2.0

WORKDIR /api

COPY 'Cloud Computing/herbapedia-api/package*.json' ./

RUN npm install

COPY . .

ENV PORT 443

EXPOSE 23450

CMD ["npm", "run", "start"]