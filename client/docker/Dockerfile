FROM node:12-alpine as builder
WORKDIR /usr/app
copy package.json /usr/app/package.json
RUN npm install --only=prod
COPY ./usr/app
RUN npm build

FROM nginx:1.16.0-alpine
COPY --from=build /app/build/usr/share/nginx/html
EXPOSE 80
CMD ['nginx', "-g", "daemon.off;"]