FROM node:12.2.0-alpine

ENV PATH /node_modules/.bin:$PATH

COPY package.json package.json
RUN npm install --silent
RUN npm install react-scripts@3.0.1 -g --silent

CMD ["npm", "start"]
