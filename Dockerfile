FROM node:8.2.0-alpine
#
ENV APP_ROOT /app

# Create server directory
WORKDIR $APP_ROOT
COPY . $APP_ROOT

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh python python-dev py-pip build-base
RUN apk add --no-cache zeromq-dev

ENV npm_config_zmq_external="true"

RUN npm install
ENTRYPOINT ["./docker-entrypoint.sh"]
RUN node generate_config_file

EXPOSE 3000
CMD ["./bin/bitcore-node", "start"]