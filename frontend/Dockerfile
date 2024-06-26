# Use an official Node.js image as a base, specifying the version
FROM node:20.10.0

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install the dependencies using yarn
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the React application
RUN yarn build

# Use an Nginx image to serve the built React application
FROM nginx:alpine
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose the port Nginx runs on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
