import { ethers } from "ethers";
import { readFileSync } from "fs";
import { config } from "./dotenv";

export class Contract {
    private static provider = new ethers.providers.JsonRpcProvider();
    private static abi = JSON.parse(readFileSync('/home/felipeollx/Documents/contract_pachinko/artifacts/contracts/Lock.sol/Tochinko.json').toString()).abi;
    private static contract: ethers.Contract

    public static connectContract(privateKey: string) {
        const ownerSigner = new ethers.Wallet(privateKey, this.provider).connect(this.provider);

        return new ethers.Contract(config.CONTRACT_ADDRESS!, Contract.abi, ownerSigner);
    }


    public static getContract() {
        if (Contract.contract == null){ 
            Contract.contract = Contract.connectContract(config.ETHERS_PRIVATE_KEY!);
        }

        return Contract.contract;
    }
    

}