import { Users } from '../../clients/orm/entity/User';
import {AppDataSource} from '../../clients/orm/type-orm';
import {newUserData} from '../../models/userData';
export default class newUserService {

    public async checkUserExistence(userName: string): Promise<boolean>{
        const userRepository = await AppDataSource.getRepository(Users);

        const user = await userRepository.findOneBy({name: userName});

        console.log(user)

        if (user === null){
            return Promise.resolve(false);
        } else {
            return Promise.resolve(true);
        }
        
    }

    public async insertUser(newUserData: newUserData): Promise<string>{
        const userRepository = await AppDataSource.getRepository(Users);

        const newUser = new Users();

        newUser.name = newUserData.userName;
        // TODO XXX encrypt password
        newUser.password = newUserData.password;
        newUser.user_side_public_key = newUserData.personalWallet;
        // TODO XXX method for creating new app side wallet
        newUser.wallet_public_key = 'chave_pública_da_carteira_do_app';
        //TODO XXX encrypt private key - must be in a decryptable fashion
        newUser.wallet_private_key = 'chave_privada_da_carteira_do_app';

        const user = await userRepository.save(newUser);

        console.log(user.id);

        if (user === null){
            return Promise.resolve('algo falhou com o usuário novo');
        } else {
            return Promise.resolve(user.id);
        }
        
    }

}