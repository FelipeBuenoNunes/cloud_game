
import dotenv from 'dotenv';

dotenv.config();

const config = {
    //HTTP
    PORT: process.env.SERVER_PORT,
    CONFIG_CORS: process.env.CONFIG_CORS || "http://localhost:3000",
    //POSTGRES
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,
    POSTGRES_PORT: parseInt(process.env.POSTGRES_PORT || "0"),
    POSTGRES_HOST: 'localhost',
    //REDIS
    REDIS_URL: process.env.REDIS_URL,
    REDIS_PORT: parseInt(process.env.REDIS_PORT || "0"),
    //BLOCKCHAIN
    ETHERS_PRIVATE_KEY: process.env.ETHERS_PRIVATE_KEY,
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    SECRET_MESSAGE: process.env.SECRET_MESSAGE,
    ABI_FOLDER: process.env.ABI_FOLDER!
};

// Object.values(config).forEach((value) => {
//     if(!value) throw "ERROR IN YOUR .ENV";
// });

export { config };