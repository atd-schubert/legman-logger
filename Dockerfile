FROM node:latest

MAINTAINER Arne Schubert <atd.schubert@gmail.com>

WORKDIR /opt/legman-logger

# Make dependencies cacheable
COPY ./package-lock.json ./package.json /opt/legman-logger/
RUN npm i

COPY . /opt/legman-logger
RUN npm run transpile

CMD ["npm", "test"]
