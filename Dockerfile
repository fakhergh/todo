FROM node:14
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]

#install additional libraries for bcrypt
RUN apt-get update
RUN apt-get install -y build-essential
RUN apt-get install -y python

RUN npm install

COPY . .
EXPOSE 5000
CMD ["npm", "start"]
