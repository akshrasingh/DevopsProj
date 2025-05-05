# Use node:18 image
FROM node:18

# Set working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json for npm install
COPY package*.json ./

# Install dependencies
RUN npm install

# Ensure the node_modules/.bin is owned by the correct user (node)
RUN chown -R jenkins:jenkins /app

# Copy the rest of the app
COPY . .

# Expose frontend port (adjust this as needed)
EXPOSE 3000

# Run the frontend application
CMD ["npm", "start"]
