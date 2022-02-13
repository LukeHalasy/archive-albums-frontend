FROM node:16-alpine3.14 as base
WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . .

FROM base as dev
ENV REACT_APP_BACKEND_URL http://localhost:4000
ENV GENERATE_SOURCEMAP false
CMD ["npm", "start"]

FROM base as build-deps
ENV REACT_APP_BACKEND_URL https://server.archivealbums.com
RUN ["npm", "run" , "build"]

FROM macbre/nginx-brotli:latest as prod

WORKDIR /etc/nginx
ADD nginx.conf /etc/nginx/nginx.conf

COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]


