import { apiResponseError } from "../../../models";
import { UnexpectedPayload } from "../../../models/errors/client";
import { UnspecifiedError } from "../../../models/errors/server";

type KeyAndType = {
    key: string
    type: string
}

export type argumentFunctionValidate = {
    obj: object,
    regExps: Map<string, RegExp>
};

export function PatternValidate(arg: argumentFunctionValidate): (key: string, value: string) => any {
    const keysAndType: KeyAndType[] = [];
    Object.entries(arg.obj).forEach(values => keysAndType.push({ key: values[0], type: typeof values[1] }));

    var validateLength = keysAndType.length;
    const resetContactor = () => validateLength = keysAndType.length;

    //default error which is handled in the file errorDefault
    const errorDefault = new Error("payload")

    return function reviver(key: string, value: any) {
        try {
            if (!key) {
                if (validateLength !== 0) throw "length";
                resetContactor();
                return value
            }
            //Is the key expected?
            const currentKey = keysAndType.find(obj => obj.key === key);
            if (!currentKey) throw "there is no key";

            validateLength--;
            if (currentKey.type === "string") {
                //If there is regexp in the argument, change the regexp...
                var regexp = /^(?!\s*$).+/;
                const regexpArgument = arg.regExps.get(key);
                if (regexpArgument) regexp = regexpArgument;

                if (regexp.test(value)) return value;
            } else if (currentKey.type === "number") {
                //Isn't it a number? automatically throws an error
                const num = Number(value)
                if (
                    value === "" ||
                    // is there space?
                    / /g.test(value) ||
                    Number.isNaN(num)
                ) throw "number";

                return num
            };

            throw "default";
        } catch (e) {
            console.error("error in validating " + e)
            resetContactor();
            throw errorDefault
        }
    }
}
