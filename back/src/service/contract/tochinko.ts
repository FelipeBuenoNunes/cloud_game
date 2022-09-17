import { Contract } from "../../config/ehters";

export class Tochinko {

    private static contract = Contract.getContract();

    public static async mintToken(publicKey: string, qtd: number): Promise<boolean> {
        try {
            await Tochinko.contract.mint(publicKey, qtd);
            return true
        }catch(e: any) {
            console.error(e);
            return false
        }
    }

    public static async burntoken(publicKey: string, qtd: number): Promise<boolean> {
        try {
            await Tochinko.contract.burnLove(publicKey, qtd);
            return true
        } catch(e) { 
            console.error(e);
            return false;
        }
    }

    public static async getBalance(publicKey: string): Promise<number> {
        const balance = await Tochinko.contract.balanceOf(publicKey)
        return parseInt(balance._hex, 16)
    }
}
