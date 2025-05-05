# Use node:18 image
FROM node:18

# Set working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json for npm install
COPY package*.json ./

# Install dependencies (preferably as non-root user later)
RUN npm install

# Ensure jest is available by making node_modules/.bin accessible to all users
RUN chown -R jenkins:jenkins /app

# Copy the rest of the app
COPY . .

# Expose the backend port (adjust this if necessary)
EXPOSE 5000

# Run the application in dev mode
CMD ["npm", "run", "dev"]
