FROM vuejs/ci
# Create app directory
WORKDIR /code

# Install app dependencies
COPY package.json /code/
#RUN npm update
#RUN npm install –g @vue/cli
RUN npm install

# Bundle app source
COPY . /code/
RUN npm run dev
EXPOSE 8080
CMD [ "npm", "run", "dev" ]
