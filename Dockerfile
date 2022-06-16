FROM node:16 as appbuild
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev
COPY --from=appbuild /app/dist .
RUN npm install pm2 -g
EXPOSE 8080
CMD ["pm2-runtime", "index.js"]