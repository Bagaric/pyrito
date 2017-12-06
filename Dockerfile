FROM node:carbon

COPY startup.sh /startup.sh
RUN chmod 755 /startup.sh

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install -g truffle truffle-contract
COPY . .
RUN npm install
# If you are building your code for production
# RUN npm install --only=production

EXPOSE 8080
