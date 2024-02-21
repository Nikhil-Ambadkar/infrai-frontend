# Use Node.js version 16 as base image
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose port 5000 to the outside world
EXPOSE 4000

# Serve the build files using serve
# CMD ["serve", "-s", "-l", "4000", "build"]
CMD ["npm", "start"]
