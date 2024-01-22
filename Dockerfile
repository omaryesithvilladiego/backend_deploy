FROM node:18-alpine3.18

WORKDIR /app

COPY . .

RUN yarn install

EXPOSE 4000

CMD ["yarn", "start"]