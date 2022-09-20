import sessionServices from "../../session/sessionServices";

export async function setSession(cookie: string, idRoom: string) {
    const session = sessionServices.getWithCookie(cookie);
    if(await session) {
        return 
    }
}