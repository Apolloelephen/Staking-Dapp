import { useEffect, useState } from "react";
import { getContract } from "../constants/contracts";
import { readOnlyProvider } from "../constants/providers";
import { ethers } from "ethers";
import stakingAbi from "../constants/stakeAbi.json";
import multicallAbi from "../constants/multicall.json";

const useGetAllPools = () => {
  const [data, setData] = useState([]);
  const [numOfPool, setNumOfPool] = useState(0);

  const contract = getContract(readOnlyProvider);

  useEffect(() => {
    (async () => {
      contract
        .id()
        .then((res) => setNumOfPool(Number(res)))
        .catch((err) => console.log(err));

      const poolIDs = [...Array.from({ length: numOfPool + 1 })].map(
        (_, index) => index
      );

      console.log(poolIDs);

      const itf = new ethers.Interface(stakingAbi);
      const calls = poolIDs.map((x) => ({
        target: import.meta.env.VITE_contract_address,
        callData: itf.encodeFunctionData("getPoolByID", [x]),
      }));

      //multicall
      const multicall = new ethers.Contract(
        import.meta.env.VITE_multicall_address,
        multicallAbi,
        readOnlyProvider
      );

      const callResults = await multicall.tryAggregate.staticCall(false, calls);
      const validResponsesIndex = [];
      const validResponses = callResults.filter((x, i) => {
        if (x[0] === true) {
          validResponsesIndex.push(i);
          return true;
        }
        return false;
      });

      const decodedResponses = validResponses.map((x) =>
      itf.decodeFunctionResult("getPoolByID", x[1])
  );

      setData(decodedResponses);
    })();
  },[numOfPool]);

  return data
};

export default useGetAllPools;
