FROM node:24-slim
WORKDIR /app
COPY . .
ENV NODE_ENV=production
RUN npm ci
USER node
CMD ["npm", "start"]
