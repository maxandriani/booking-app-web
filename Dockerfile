# -- BULD --
FROM node:18-alpine as build

WORKDIR /usr/src/app
COPY . .

RUN npm install
RUN npm run build

# -- RELEASE --
FROM nginx:1.23 as release

EXPOSE 80

ENV REACT_APP_API_HOST=http://localhost:3000

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY create-react-env.sh /docker-entrypoint.d
RUN chmod ug+rw /usr/share/nginx/html/env.js
RUN chmod ug+x /docker-entrypoint.d/create-react-env.sh

CMD ["nginx", "-g", "daemon off;"]