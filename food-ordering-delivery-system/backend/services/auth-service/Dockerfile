# Use Node.js base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port (use the same port as defined in your server.js file, e.g., 3000)
EXPOSE 3000

# Start the application
CMD ["node", "server.js"]
