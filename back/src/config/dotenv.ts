
import dotenv from 'dotenv';

dotenv.config();

const config = {
    PORT: process.env.SERVER_PORT,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT!),
    POSTGRES_HOST: 'localhost'
};

export { config };