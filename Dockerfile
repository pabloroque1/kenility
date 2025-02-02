FROM node:18-alpine AS development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .

RUN npm run build

USER node

CMD [ "node", "dist/main.js" ]
