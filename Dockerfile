# Use official Node.js LTS image
FROM node:18

# Create app directory in container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Expose port the app runs on
EXPOSE 3000

# Run the app
CMD ["npx", "nodemon", "server.js"]

