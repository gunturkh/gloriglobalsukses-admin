FROM node:14.17.1-alpine AS builder

ARG REACT_APP_SERVER_URL
ARG REACT_APP_SOCKET_HOST
ARG REACT_APP_SOCKET_PATH

WORKDIR /app

COPY . .

RUN yarn install

RUN PUBLIC_URL=/gloriglobalsukses-admin PUBLIC_URL2=TEST \
REACT_APP_SERVER_URL=${REACT_APP_SERVER_URL} \
REACT_APP_SOCKET_HOST=${REACT_APP_SOCKET_HOST} \
REACT_APP_SOCKET_PATH=${REACT_APP_SOCKET_PATH} \
GENERATE_SOURCEMAP=false \
npm run-script build --prod

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .

WORKDIR /etc/nginx/conf.d/

COPY nginx.conf .

RUN mv default.conf default.conf.bak

RUN cp nginx.conf default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
