# cloud_game

## Testing app:

1 - insert .env on /back with following data:

|  var environment  |
|-------------------|
|    SERVER_PORT    |
|   POSTGRES_USER   |
| POSTGRES_PASSWORD |
|    POSTGRES_DB    |
|   POSTGRES_PORT   |
|  SECRET_MESSAGE   |

2 - insert .env on project root with following data:

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

```
docker-compose up
```

> tip: This command may get an error if this happens, you could try running the following command.
```docker compose up```
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