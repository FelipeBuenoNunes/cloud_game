import { apiResponseError } from "..";
import { kindError } from "./kind";

export const 
    InvalidSession = new apiResponseError(kindError.SERVER, "Invalid session", 490), // todo, code error
    UserAlreadyExists = new apiResponseError(kindError.CLIENT, "User already exists", 409)