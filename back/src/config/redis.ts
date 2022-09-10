import Redis from 'ioredis';
import { config } from "./dotenv"
export const redis = new Redis(config.REDIS_PORT);