FROM node:16-alpine
WORKDIR /home/node/app/

COPY --chown=node:node . .
RUN mkdir -p node_modules
RUN mkdir -p build

RUN yarn cache clean && yarn install --frozen-lockfile


EXPOSE 8001
RUN yarn build

RUN chown -R node:node  /home/node/app/node_modules
RUN chown -R node:node  /home/node/app/build

USER node
CMD ["yarn", "start"]