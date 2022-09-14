import { kindError, kindErrorString } from "./kind";

interface messageError {
    code: number
    kind: string
    message: string
}

/**
 * @swagger
 * components:
 *   schemas:
 *     messageError:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *           example: 0
 *         kind:
 *           type: string
 *           enum: [CLIENT, SERVER]
 *           example: ""
 *         message: 
 *           type: string
 *           example: ""
 */

class apiResponseError extends Error {
    private code: number | null
    private kind: kindError

    constructor(type: kindError, message: string, code?: number) {
        super(message)
        this.code = code ? code : null;
        this.kind = type;
    }

    public returns(): messageError {
        this.arrangeCode();
        return {
            code: this.code!,
            kind: kindErrorString.get(this.kind)!,
            message: this.message
        }
    }

    private arrangeCode() {
        if(this.code) return

        switch (this.kind) {
            case kindError.CLIENT:
                this.code = 400;
                break;
            case kindError.SERVER:
                this.code = 500;
                break;
        }
    }
}

export { apiResponseError }