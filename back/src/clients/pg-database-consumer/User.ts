import { Users } from "../orm/entity/User"
import { User } from "../../models/infra/user";
import { createHash } from "crypto";
import { UserAlreadyExists } from "../../models/errors/client";

export class UserDbConsumer {
    private user: Users;
    constructor(user: User) {
        this.createInstance(user)
    }

    private createInstance(user: User) {
        const newUser = new Users();
        newUser.name = user.name || "";
        newUser.password = createHash('sha256').update(user.password).digest('hex');
        newUser.user_side_public_key = user.user_side_public_key;
        newUser.wallet_public_key = user.wallet_public_key || "";
        newUser.wallet_private_key = user.wallet_private_key || "";

        this.user = newUser;
    }

    public async insert(): Promise<string>{
        try {
            await this.user.save()
            //returns the id to create a session
            return this.user.id
        }catch(e: any) {
            if(e.code === '23505') 
                throw UserAlreadyExists
            
            throw "Unspecified error"
        }
    }

    public async find(): Promise<User|null>{
        try {
            const user = await Users.findOneBy({
                user_side_public_key: this.user.user_side_public_key,
                password: this.user.password
            });
            return user;
        }catch(e: any) {
            throw "Unspecified error"
        }
    }


}