import { Users } from "../orm/entity/User"
import { User } from "../../models/infra/user";
import { createHash } from "crypto";
import { UserAlreadyExists, AccountNotRegistred } from "../../models/errors/client";
import { apiResponseError } from "../../models";

export class UserDbConsumer {
    private user: Users;
    constructor(user: User) {
        this.createInstance(user)
    }

    private createInstance(user: User) {
        const newUser = new Users();
        newUser.name = user.name;
        newUser.password = createHash('sha256').update(user.password).digest('hex');
        newUser.user_side_public_key = user.user_side_public_key;
        newUser.wallet_public_key = user.wallet_public_key;
        newUser.wallet_private_key = user.wallet_private_key;

        this.user = newUser;
    }

    public async insert(): Promise<User>{
        try {
            await this.user.save()
            //returns the id to create a session
            return this.user
        }catch(e: any) {
            if(e.code === '23505') throw UserAlreadyExists;
            
            throw "Unspecified error";
        }
    }

    public static async find(user: Partial<User>): Promise<User> {
        try {
            const db = await Users.findOneBy({
                user_side_public_key: user.user_side_public_key,
                password: createHash('sha256').update(user.password!).digest('hex')
            });
            if(!db) throw AccountNotRegistred;
            return db;
        }catch(e: any) {
            if(e instanceof apiResponseError) throw e
            throw "Unspecified error";
        }
    }


}