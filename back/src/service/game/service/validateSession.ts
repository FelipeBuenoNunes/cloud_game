import sessionServices from "../../session/sessionServices";

export async function setSession(cookie: string, idRoom: string) {
    const session = sessionServices.createWithCookie(cookie);
    if(await session) {
        return 
    }
}