FROM node:18

# Create app directory
WORKDIR /root/work

COPY . .

RUN npm install -ci
# If you are building your code for production
# RUN npm ci --only=production

EXPOSE 8080
CMD [ "node", "server.js" ]