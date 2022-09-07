import { apiResponseError } from "..";
import { kindError } from "./kind";

export const 
    UserAlreadyExists = new apiResponseError(kindError.CLIENT, "User already exists", 409)