import { UserDbConsumer } from '../../clients/pg-database-consumer/User';
import Redis from 'ioredis';
import {config} from '../../config/dotenv';
import { newUserData } from '../../models/requests/newUser';
import { User } from "../../models/infra/user";
import { Wallet } from "ethers"
import { createHash } from 'crypto';
import { Users } from '../../clients/orm/entity/User';

export default class sessionServices {
    public async createUserSession(userSidePublicKey: string): Promise<string> {

        const redis = new Redis(config.REDIS_PORT);

        console.log(userSidePublicKey);

        const sessionData = {
            user: userSidePublicKey,
            assignedTable: 'none'
        }

        const stringiedSessionData = JSON.stringify(sessionData);

        await redis.set(userSidePublicKey, stringiedSessionData);

        const existingSession = await redis.get(userSidePublicKey);

        if (existingSession !== null){
            return Promise.resolve(existingSession)
        } else {
            return Promise.reject()
        }
        

        // if (await new UserDbConsumer(newUser).insert()) return "Success"
        // return "error"
    }

}