import dotenv from "dotenv"
dotenv.config();
export default class getMessageService {

    public createMessage(): string{
        return this.randomMessage();
    }

    private randomMessage(): string {
        const secret = process.env.SECRET_MESSAGE!
        return secret;
    }
}