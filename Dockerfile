FROM node:12.19.0
WORKDIR /lastcall
COPY . /lastcall
RUN npm install
CMD ["npm", "run","start"]
EXPOSE 8080