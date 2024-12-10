FROM public.ecr.aws/b2r7m8f2/node:20
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

COPY --chown=node:node  . ./

RUN npm run generate
RUN npm run build

USER 1000

EXPOSE 8080
CMD ["node", "dist/index.js"]