import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const useIsCreator = () => {
    const { address } = useWeb3ModalAccount();

    return address === import.meta.env.VITE_creator_address;
};

export default useIsCreator;
