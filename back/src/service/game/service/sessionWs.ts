import sessionServices from '../../session/sessionServices';

export class sessionWs {
    private cookie: string;
    private session: sessionServices;
    constructor(cookie: string) {
        this.cookie = cookie;
    }

    public async hasSession(): Promise<boolean> {
        const session = await sessionServices.getWithCookie(this.cookie);
        if(!session) return false;
        this.session = session;
        return true;
    }

    public updateSession = (gameId: string) => this.session.updateSession(true, gameId);
    
}