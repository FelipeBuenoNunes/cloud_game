
import { UserDbConsumer } from '../../clients/pg-database-consumer/User';
import { newUserData } from '../../models/requests/newUser';
import { User } from "../../models/infra/user";

export default class findUserService {
    public async findUser(newUserData: newUserData): Promise<string> {

        const currentUser: User = {
            name: newUserData.userName,
            password: newUserData.password,
            user_side_public_key: newUserData.personalWallet,
            wallet_public_key: '',
            wallet_private_key: ''
        }

        const createdUser = await new UserDbConsumer(currentUser).find();
        return createdUser;
    }

}