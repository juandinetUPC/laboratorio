FROM node:carbon-slim

# Create app directory
WORKDIR /supermarket_api

# Install app dependencies
COPY package.json /supermarket_api/
RUN npm install

# Bundle app source
COPY . /supermarket_api/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]
