import { redis } from '../../config/redis';
import { Session } from '../../models/session/session';
import { randomUUID } from 'crypto';

export default class sessionServices {
    public static cookieName = "pachin-game/cookie"
    private session: Session;
    private idSession: string;
    private expires?: number;

    constructor(idUser?: string, publicKey?: string) {
        if (!idUser || !publicKey) return;

        this.idSession = randomUUID();
        this.session = {
            idUser: idUser,
            publicKey: publicKey,
            inGame: false
        }
        this.setSession();
    }

    public static async isValidSession(cookie: string): Promise<boolean> {
        return await redis.get(cookie) != null;
    }

    public static async createWithCookie(cookie: string): Promise<sessionServices | null> {
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
    
    public refreshCookie() {
        const timeSession = (this.session.inGame) ? 24*60 : 5*60
        this.expires = (this.session.inGame) ? Date.now() + timeSession*1000 : Date.now() + timeSession*1000;
        return timeSession;
    }

    public updateSession(isGame: boolean, gameSessionId?: string) {
        this.session = {
            idUser: this.session.idUser,
            publicKey: this.session.publicKey,
            inGame: isGame,
            gameSessionId: gameSessionId
        }
        this.setSession();
    }


}