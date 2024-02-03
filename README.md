# cloud_game

## Testing app:

1 - insert .env on /back with following keys:

|  var environment  |
|-------------------|
|    SERVER_PORT    |
|   SECRET_MESSAGE  |
|   POSTGRES_USER   |
| POSTGRES_PASSWORD |
|    POSTGRES_DB    |
|   POSTGRES_PORT   |
|    REDIS_PORT     |
|  CONTRACT_ADDRESS |
| ETHERS_PRIVATE_KEY|

2 - insert .env on project root with following keys:

|     var environment      |
|--------------------------|
|      POSTGRES_USER       |
|    POSTGRES_PASSWORD     |
|       POSTGRES_DB        |
|  PGADMIN_DEFAULT_EMAIL   |
| PGADMIN_DEFAULT_PASSWORD |
|   PGADMIN_LISTEN_PORT    |

> tip:
Run the following command to connect to the database with psql
```docker exec -it postgres_pachinko psql -d "your_name_db" -U "your_user_db"```
Run the following command to connect to the database(redis) with redis-cli
```docker exec -it redisdb_pachinko redis-cli```


3 - on project root run:
> First:
You need to fill all environment variables 

```
systemctl start docker

docker compose up
```

> tip: This command may get an error if this happens, you could try running the following command.
```docker compose up -dgi```
> If the error persists, consult the official documentation

4 - on /back run:

```
yarn install && yarn dev 
```

5 - on /front run:

```
yarn install && yarn dev
```

happy coding ...
