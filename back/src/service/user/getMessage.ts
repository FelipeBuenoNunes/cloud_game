import { config } from "../../config/dotenv";


export default class getMessageService {

    public createMessage(): string{
        return this.randomMessage();
    }

    private randomMessage(): string {
        const secret = config.SECRET_MESSAGE!
        return secret;
    }
}