import sessionServices from "../session/sessionServices";
import { redis } from '../../config/redis';
import { randomUUID } from "crypto";

export default class handshakeTokenService {
    private cookie: sessionServices;
    private token: string;

    constructor(cookie: sessionServices) {
        this.cookie = cookie;
        this.token = randomUUID();
    }
    
    public getTempToken() {
        this.setToken();
        return this.token;
    }

    private setToken() {
        redis.setex(this.token, 0.5*60, this.cookie.getID());
    }
}