# Use a large Node.js base image to build the application
FROM node:20.15.0-bullseye-slim

# RUN apk add --update tzdata
ENV TZ="Europe/Berlin"

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm install && npm cache clean --force


# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Set environment variables
ENV HOST=0.0.0.0
ENV PORT=3000
ARG NUXT_PUBLIC_VERSION
ENV NUXT_PUBLIC_VERSION=$NUXT_PUBLIC_VERSION

# Expose the port
EXPOSE 3000/tcp

# Start the application
CMD ["node", ".output/server/index.mjs"]
