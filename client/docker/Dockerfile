FROM node:12-alpine as builder
WORKDIR /usr/app
COPY package.json /usr/app/package.json
RUN npm ci install --only=prod
COPY ./usr/app
RUN npm build

FROM nginx:1.16.0-alpine
COPY --from=build /app/build/usr/share/nginx/html
EXPOSE 80
CMD ['nginx', "-g", "daemon.off;"]