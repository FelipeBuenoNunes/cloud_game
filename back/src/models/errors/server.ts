import { apiResponseError } from "..";
import { kindError } from "./kind";

export const 
    UnspecifiedError = new apiResponseError(kindError.SERVER, "Unspecified error", 500)