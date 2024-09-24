#FROM ubuntu:latest
#LABEL authors="hui"
#
#ENTRYPOINT ["top", "-b"]
# Stage 1: Build the React app
# Stage 1: Build the React app
FROM node:18 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the React app
RUN npm run build

# Stage 2: Set up the Express server with YAML config
FROM node:18

# Set the working directory for the final image
WORKDIR /app

# Install production dependencies (skip dev dependencies)
COPY package*.json ./
RUN npm install --only=production

# Copy the build folder from the first stage
COPY --from=build /app/build /app/build

# Copy the server.js and config.yaml files
COPY server.js /app/server.js
COPY config.yaml /app/config.yaml

# Expose the port (customizable through YAML config or environment variables)
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
