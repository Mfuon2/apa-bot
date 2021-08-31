# Stage 1
# pull node from alpine
FROM node:14.16-alpine as node

# Maintainer Labels
LABEL project="Whatsapp Bot"
LABEL maintainer="mfolee@gmail.com"

EXPOSE 80
# define app working directory
WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm ci --only=production

# copy project files to our image
COPY ./dist .


