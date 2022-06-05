FROM node:18.2.0

WORKDIR /api

COPY cc/herbapedia-api/package*.json ./

RUN npm install

COPY cc/herbapedia-api/ .

ENV PORT 23450

EXPOSE 23450

CMD ["npm", "run", "start"]