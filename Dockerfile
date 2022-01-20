FROM node:17-alpine3.14 as base
WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

FROM base as dev
CMD ["npm", "start"]

FROM base as build-deps
RUN ["npm", "run" , "build"]

FROM nginx:1.21.5-alpine as prod
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]


