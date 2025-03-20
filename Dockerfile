FROM node:20-alpine

USER node

RUN mkdir /home/node/nest-js

WORKDIR /home/node/nest-js

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node dist/ .
COPY --chown=node:node src/users/mocks/ ./src/users/mocks 

CMD ["node", "main.js"]
