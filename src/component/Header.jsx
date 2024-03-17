import useIsCreator from "../hooks/useIsCreator";
import { Flex } from "@radix-ui/themes";
import CreatePoolComponent from "./CreatePool";

export default function Header() {
    const isCreator = useIsCreator();
    return (
        <div className="flex justify-between items-center">
            <div>STAKING BOOTH</div>
            
            <Flex gap={"4"} align={"left"}>
            {isCreator && <CreatePoolComponent />}
                <w3m-button />
            </Flex>
            
        </div>
    );
}
