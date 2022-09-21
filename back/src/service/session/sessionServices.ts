import { redis } from '../../config/redis';
import { Session } from '../../models/session/session';
import { randomUUID } from 'crypto';

export default class sessionServices {
    public static cookieName = "pachin-game/cookie"
    private session: Session;
    private idSession: string;
    private expires?: number;

    constructor(idUser?: string, publicKey?: string, name?: string) {
        if (!idUser || !publicKey || !name) return;

        this.idSession = randomUUID();
        this.session = {
            idUser: idUser,
            name: name,
            publicKey: publicKey,
            inGame: false
        }
        this.setSession();
    }

    public static async isValidSession(cookie: string): Promise<boolean> {
        return await redis.get(cookie) != null;
    }

    public static async getWithCookie(cookie: string): Promise<sessionServices | null> {
        const session = await redis.get(cookie);
        if (!session) return null

        const newSessionService = new sessionServices();
        newSessionService.session = JSON.parse(session);
        newSessionService.idSession = cookie;
        return newSessionService;
    }

    public getID = (): string => this.idSession;
    public get = (): Session => this.session;
    public getExpires = (): Date => new Date(this.expires || 0)

    private async setSession(): Promise<string> {
        await redis.setex(this.idSession, this.refreshCookie(), JSON.stringify(this.session));
        return this.idSession;
    }
    
    private refreshCookie() {
        const timeSession = (this.session.inGame) ? (24*60)*60 : 5*60
        this.expires = Date.now() + (24*60)*60*1000;
        return timeSession;
    }

    public async increaseSessiontime() {
        await redis.setex(this.idSession, 24*60*60, JSON.stringify(this.session));
    }

    public updateSession(isGame?: boolean, gameSessionId?: string) {
        if(isGame && !gameSessionId) throw new Error("ARGUMENT INVALID");
        this.session = {
            idUser: this.session.idUser,
            name: this.session.name,
            publicKey: this.session.publicKey,
            inGame: isGame || this.session.inGame,
            gameSessionId: gameSessionId
        }
        this.setSession();
    }

}