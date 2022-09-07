# cloud_game

## Testing app:

1 - insert .env on /back with following data:

SERVER_PORT
POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
POSTGRES_PORT
SECRET_MESSAGE

2 - insert .env on project root with following data:

POSTGRES_USER
POSTGRES_PASSWORD
POSTGRES_DB
PGADMIN_DEFAULT_EMAIL
PGADMIN_DEFAULT_PASSWORD
PGADMIN_LISTEN_PORT

> tip:
Run the following command to connect to the database with psql
```docker exec -it postgres pachinko psql -d "your name db" -U "your user db"```

3 - on /back run:

yarn install

4 - on /front run:

yarn install

5 - on project root run:

docker compose up

6 - on /back run:

yarn run dev

7 - on /front run:

yarn run dev

happy coding ...