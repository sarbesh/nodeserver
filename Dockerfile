FROM node:18.14.2-alpine
# COPY package.json app/
# COPY ./src app/src
COPY . app
# ARG MYSQL_WRITE_HOST={{MYSQL_WRITE_HOST}}
# ARG MYSQL_READ_HOST={{MYSQL_READ_HOST}}
# ARG MYSQL_WRITE_PORT={{MYSQL_WRITE_PORT}}
# ARG MYSQL_READ_PORT={{MYSQL_READ_PORT}}
# ARG MONGO_URL={{MONGO_URL}}
# ARG PORT={{PORT}}

WORKDIR /app

RUN npm install --quite

CMD npm start

EXPOSE 3001