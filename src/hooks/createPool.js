import { useCallback } from "react";
import { isSupportedChain } from "../utils";
import { getProvider } from "../constants/providers";
import { getContract } from "../constants/contracts";

const createPool = async(rewardRate,chainId,walletProvider) => {
  

  // return useCallback(async () => {
    if (!isSupportedChain(chainId)) return console.error("Wrong network");
    try {
    const readWriteProvider = getProvider(walletProvider);
    const signer = await readWriteProvider.getSigner();
    console.log("HERE",chainId)
    const contract = getContract(signer);


      const transaction = await contract.createPool(100);

      console.log("transaction: ", transaction);
      const receipt = await transaction.wait();

      console.log("receipt: ", receipt);

      if (receipt.status) {
        return console.log("Create Pool successful!");
      }

      console.log("Create Pool failed!");
    } catch (error) {
      console.error("error: ", error);
    }
  // }, [rewardRate, chainId, walletProvider]);
};

export default createPool;
