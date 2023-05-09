FROM node:18-alpine AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile
COPY . .


FROM node:18-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist

COPY package*.json ./

RUN yarn install --frozen-lockfile --production

EXPOSE 4000

CMD ["yarn", "start:prod"]