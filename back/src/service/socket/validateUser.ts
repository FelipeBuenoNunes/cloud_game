import { Tochinko } from "../contract/tochinko";
import sessionServices from "../session/sessionServices";

export class validateUser {
    private cookie: string;
    private session: sessionServices;

    constructor(cookie: string) {
        this.cookie = cookie;
    }

    public async couldConnect(): Promise<boolean> {
        return await this.validateSession() && await this.enoughBalance();
    }

    private async validateSession(): Promise<boolean> {
        const session = await sessionServices.getWithCookie(this.cookie);
        if (!session) return false;
        this.session = session;
        return true;
    }

    private async enoughBalance(): Promise<boolean> {
        return (await Tochinko.getBalance(this.session.get().publicKey) > 0);
    }
}