# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /cs-tool-react

# add `/app/node_modules/.bin` to $PATH
ENV NODE_ENV=development

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./

# start app
CMD ["npm", "start"]  