import { UserDbConsumer } from '../../clients/pg-database-consumer/User';
import { newUserData } from '../../models/requests/newUser';
import { User } from "../../models/infra/user";
import { Wallet } from "ethers"
import { createHash } from 'crypto';
import { Users } from '../../clients/orm/entity/User';

export default class newUserService {
    public async insertUser(newUserData: newUserData): Promise<string> {

        const newWallet = await this.newWallet();
        const newUser: User = {
            name: newUserData.userName,
            password: newUserData.password,
            user_side_public_key: newUserData.personalWallet,
            wallet_public_key: newWallet.public,
            wallet_private_key: newWallet.private
        }

        const createdUser = await new UserDbConsumer(newUser).insert();
        if ( createdUser !== "error") return createdUser;
        return "error"
    }

    private async newWallet() {
        const wallet = Wallet.createRandom();
        return {
            "public": await wallet.getAddress(),
            "private": wallet.privateKey
        }
    }
}