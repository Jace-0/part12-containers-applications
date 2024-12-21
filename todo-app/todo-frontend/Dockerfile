FROM node:20 AS build-stage

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci

COPY . .

# ARG VITE_BACKEND_URL=http://localhost:3000
ENV VITE_BACKEND_URL=/api

# Test stage 
FROM build-stage AS test-stage

RUN npm run test

RUN npm run build 

# FROM nginx:1.25-alpine

# COPY --from=test-stage /usr/src/app/dist /usr/share/nginx/html


# Production stage
FROM nginx:1.20.1
COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

# Add nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80