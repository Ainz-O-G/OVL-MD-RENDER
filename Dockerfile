FROM node:lts-alpine

RUN apk add --no-cache git ffmpeg && \
    git clone https://github.com/Ainz-O-G/OVL-MD-r /ovl_bott

WORKDIR /ovl_bott

COPY package.json .

RUN npm i

COPY . .

EXPOSE 8000

CMD ["npm", "run", "Ovl"]
