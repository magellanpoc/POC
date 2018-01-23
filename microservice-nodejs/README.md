# microservice-nodejs
NodeJS microservice template

### Installation instructions using Docker Compose

1. Clone this repository:
   ```sh
$ git clone https://github.com/CanopyCloud/microservice-nodejs.git microservice-nodejs
```

2. Go into the folder:
   ```sh
$ cd microservice-nodejs
```

3. Use docker compose:
   ```sh
$ sudo docker-compose up
```

### Installation instructions using containers linking
1. Clone this repository:
   ```sh
$ git clone https://github.com/CanopyCloud/microservice-nodejs.git microservice-nodejs
```

2. Build the docker container
   ```sh
$ sudo docker build -t microservice-nodejs ./microservice-nodejs
```

3. Pull the RabbitMQ docker image and run it
   ```sh
$ sudo docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq
```

4. Pull the MongoDB docker image and run it
   ```sh
$ sudo docker run -it --rm --name mongo -p 27017:27017 mongo
```

5. Run the microservice docker container and link it with RabbitMQ and MongoDB
   ```sh
$ sudo docker run -p 8080:80 --name app --link rabbitmq:rabbitmq --link mongo:mongo microservice-nodejs
```

### Random notes
Install node.js/npm without sudo
   ```sh
$ sudo apt-get -y install build-essential g++ libssl-dev pkg-config
$ sudo mkdir -p /usr/local/{share/man,bin,lib/node,include/node}
$ sudo chown -R $USER /usr/local/{share/man,bin,lib/node,include/node}
$ sudo apt-get install nodejs-legacy
$ sudo apt-get install npm
```

Install Docker
   ```sh
https://docs.docker.com/installation/ubuntulinux/#installing-docker-on-ubuntu
```

Install Docker Compose
   ```sh
https://docs.docker.com/compose/install/
```
