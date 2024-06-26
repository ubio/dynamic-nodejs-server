FROM node:18.13.0-alpine as builder

WORKDIR /builder
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./ ./src

RUN npm install

####################################################
FROM node:18.13.0-alpine
ENV NODE_ENV production
ENV NODE_NO_WARNINGS 1
ENV NODE_PATH /mnt/node_modules

WORKDIR /app
RUN chown node:node /app
RUN chown -R node:node /tmp
USER node

COPY . .
COPY --from=builder /builder/ ./out
RUN npm ci

EXPOSE 3000
CMD ["node", "server.js"]
