FROM node:lts-alpine

RUN apk add --no-cache git ffmpeg && \
    git clone https://github.com/Ainz-O-G/OVL-MD-r /ovl-r

WORKDIR /ovl-r

COPY package.json .

RUN npm i

COPY . .

EXPOSE 8000

CMD ["npm", "run", "Ovl"]
