FROM apify/actor-node:18

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm --quiet set progress=false \
    && npm install --only=prod --no-optional

# Copy source code
COPY . ./

# Run the actor
CMD npm start
