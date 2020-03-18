# base image
FROM node:12.16.1-alpine3.11
# set working directory
WORKDIR /api
# add `/api/node_modules/.bin` to $PATH
ENV PATH /api/node_modules/.bin:$PATH
RUN apk update && apk add --no-cache git
#install developers tools.
RUN npm install -g @nestjs/cli
# install and cache app dependencies
COPY package.json /api/package.json
RUN npm install

# start app
CMD ["npm", "start"]

