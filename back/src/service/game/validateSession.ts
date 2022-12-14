import { redis } from "../../config/redis";
import sessionServices from "../session/sessionServices";

//This class is simply for validating and do the "handshake"
export class startSessionWs {
    private id: string;
    private session: sessionServices;

    constructor(id: string) {
        this.id = id;
    }

    public async isValid(): Promise<boolean> {
        if(!await this.getSessionHasSuccess()) return false;

        this.session.updateSession(true, "123");
        return true;
    }

    private async getSessionHasSuccess(): Promise<boolean> {
        const idSession = await redis.get(this.id) || "";
        await redis.del(this.id)
        
        if(!idSession) return false;

        const session = await sessionServices.getWithCookie(idSession);
        if(!session) return false;

        this.session = session;
        return true
    }

}