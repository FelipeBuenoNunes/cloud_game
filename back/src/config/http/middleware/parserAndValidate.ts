import { json } from "express";

function parserAndValidation<Type, Key extends keyof Type>(obj: Type) {
    const entires = Object.keys(obj as any);
    function isKey(key: Key): boolean {
        return true
    }

    function parser<typeValue>(key: string, value: typeValue): typeValue{
        if(!entires.includes(key)) throw "error"
        if(typeof obj[key as Key] === typeof value) {
            return value
        }
        throw "error"
    }


    return json({
        reviver: parser
    })
}

interface newUserData {
    personalWallet?: string,
    password?: string,
    userName?: string,
}

const ops: newUserData = {} 
parserAndValidation<newUserData, keyof newUserData>(ops)