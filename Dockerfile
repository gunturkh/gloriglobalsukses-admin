FROM node:12.11.1-alpine AS builder

WORKDIR /app

COPY . .

RUN apk add --no-cache python2

RUN apk add g++ && apk add make

RUN npm install && npm audit fix

RUN PUBLIC_URL=/gloriglobalsukses-admin GENERATE_SOURCEMAP=false npm run-script build --prod

FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/build .

WORKDIR /etc/nginx/conf.d/

COPY nginx.conf .

RUN mv default.conf default.conf.bak

RUN cp nginx.conf default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
