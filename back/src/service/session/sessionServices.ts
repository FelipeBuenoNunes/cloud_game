import { redis } from '../../config/redis';
import { Session } from '../../models/session/session';
import { randomUUID } from 'crypto';

export default class sessionServices {
    public static cookieName = "pachin-game/cookie"
    private session: Session;
    private idSession: string

    constructor(idUser?: string) {
        if (!idUser) return;

        this.idSession = randomUUID();
        this.session = {
            inGame: false,
            idUser: idUser
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

    public get = (): string => this.idSession;

    private async setSession(): Promise<string> {
        await redis.setex(this.idSession, 500, JSON.stringify(this.session));
        return this.idSession;
    }

    public updateSession(isGame: boolean, gameSessionId?: string) {
        this.session = {
            idUser: this.session.idUser,
            inGame: isGame,
            gameSessionId: gameSessionId
        }
        this.setSession();
    }

}