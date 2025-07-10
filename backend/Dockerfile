# Use Node base image
FROM node:18

# Set working directory in container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all backend source files
COPY . .

# Expose port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
