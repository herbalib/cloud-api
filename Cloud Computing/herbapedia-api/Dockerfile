FROM node:18.2.0

# WORKDIR ./code
WORKDIR d/Belajar

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "run", "start"]