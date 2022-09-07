CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4 (),
    "name" varchar(50) UNIQUE NOT NULL,
    "password" varchar(132) UNIQUE NOT NULL,
    "user_side_public_key" char(42) UNIQUE NOT NULL,
    "wallet_public_key" char(42) UNIQUE NOT NULL,
    "wallet_private_key" char(66) UNIQUE NOT NULL 
);