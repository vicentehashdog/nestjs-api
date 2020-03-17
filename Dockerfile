# base image
FROM node:12.16.1-alpine3.11
# set working directory
WORKDIR /app
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
RUN apk update && apk add --no-cache git
#install developers tools.
RUN npm install -g @nestjs/cli
# install and cache app dependencies
COPY package.json /app/package.json
RUN npm install
#RUN npm install react-scripts@3.0.1 -g --silent
# start app
CMD ["npm", "start"]

