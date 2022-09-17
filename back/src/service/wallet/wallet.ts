import { Tochinko } from "../contract/tochinko";


export class walletService {
    public async getBalance(publicKey: string): Promise<number> {
        return await Tochinko.getBalance(publicKey);
    }

    public async mintToken(publicKey: string, qtd: number): Promise<boolean> {
        return await Tochinko.mintToken(publicKey, qtd);
    }

    public async burntoken(publicKey: string, qtd: number): Promise<boolean> {
        return await Tochinko.burntoken(publicKey, qtd);
    }
}