# Pushniak Dmytro KV-12mp
## Лабораторна робота №1. Розробка серверної частини Web-додатка

Task can be found [here](https://docs.google.com/presentation/d/1b9wo04HCWk_oL3dCuiV7YYZ_aaDBpG0pv3AMYq_9Dsw/edit#slide=id.gbc28739f99_0_164).

Report can be found [here](https://docs.google.com/document/d/1zTSW_qMtLtZx4yD-8x0D3lgyjtifooMf958CJr4LoMo/edit?usp=sharing).

# Shortify - URL shortening service

## Installation

```bash
$ yarn install
```

## Running the app

Rename <b>example.env</b> to <b>.env</b>;

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```


## Database

```bash
# start
$ docker-compose up -d

# stop
$ docker-compose down
```

## Documentation

Go to {host}:{port}/docs. 

Also, there is a json swagger file with exported docs.
