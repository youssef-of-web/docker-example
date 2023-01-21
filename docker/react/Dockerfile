FROM node:18 

WORKDIR /app

RUN apt update && \

    apt install git -y

RUN git clone  https://github.com/youssef-of-web/internationalization.git .

RUN npm i

EXPOSE 3000