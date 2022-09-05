import { AppDataSource } from "../orm/type-orm"
import { Users } from "../orm/entity/User"

class UserDbConsumer {
    public async insert(name: string, password: string, user_side_public_key: string, wallet_public_key: string, wallet_private_key: string){
        const user = new Users();
        user.name = name;
        user.password = password;
        user.user_side_public_key = user_side_public_key;
        user.wallet_public_key = wallet_public_key;
        user.wallet_private_key = wallet_private_key;
        await AppDataSource.manager.save(user);
        console.log(user.id);
    }
}