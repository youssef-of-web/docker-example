FROM nginx

RUN apt update && \
    apt install vim -y

COPY index.html /usr/share/nginx/html/

ENV PORT 80

EXPOSE ${PORT}