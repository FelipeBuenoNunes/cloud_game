import { Tochinko } from "../contract/tochinko";


export class walletService {
    public async getBalance(publicKey: string): Promise<number> {
        return await Tochinko.getBalance(publicKey);
    }

    public async minttoken(publicKey: string, qtd: number): Promise<boolean> {
        return await Tochinko.minttoken(publicKey, qtd);
    }

    public async burntoken(publicKey: string, qtd: number): Promise<boolean> {
        return await Tochinko.burntoken(publicKey, qtd);
    }
}