
import { UserDbConsumer } from '../../clients/pg-database-consumer/User';
import { AccountNotRegistred } from '../../models/errors/client';
import { User } from "../../models/infra/user";
import { loginUserData } from '../../models/requests/login';

export default class loginService {
    private data: loginUserData;

    constructor(data: loginUserData){
        this.data = data;
    }

    public async getUser(): Promise<User> {
        const currentUser: Partial<User> = {
            password: this.data.password,
            user_side_public_key: this.data.personalWallet
        }
        
        const user = await UserDbConsumer.find(currentUser);
        if(!user) throw AccountNotRegistred
        return user;
    }

}