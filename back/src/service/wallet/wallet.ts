import { Tochinko } from "../contract/tochinko";


export class walletService {
    public async getBalance(publicKey: string): Promise<number> {
        return await Tochinko.getBalance(publicKey);
    }

    public async mintTokem(publicKey: string, qtd: number): Promise<boolean> {
        return await Tochinko.mintTokem(publicKey, qtd);
    }

    public async burnTokem(publicKey: string, qtd: number): Promise<boolean> {
        return await Tochinko.burnTokem(publicKey, qtd);
    }
}