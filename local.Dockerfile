FROM node:16 as build

# Create app directory
WORKDIR /root/work

COPY . .

RUN npm install
RUN npm run build


FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /root/work/dist/client-to-do /usr/share/nginx/html

# Expose port 80
EXPOSE 80