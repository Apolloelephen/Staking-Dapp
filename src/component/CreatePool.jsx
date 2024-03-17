import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";
import { useState } from "react";
import createPool from "../hooks/createPool";
import { useWeb3ModalAccount, useWeb3ModalProvider } from "@web3modal/ethers/react";

const CreatePoolComponent = () => {
  const [value, setValue] = useState(0);

  // const handleCreatePool = useCreatePool(value);
  const { chainId } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="bg-pink-600">Create Pool Here</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 300 }}>
        <Dialog.Title>Create a Pool</Dialog.Title>
        <Dialog.Description size="5" mb="8">
          Create a Pool
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Enter reward value
            </Text>
            <TextField.Input
              // value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter reward value"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="black">
              Cancel
            </Button>
          </Dialog.Close>
          <Button className="bg-blue-600" onClick={async() =>await createPool(value,chainId,walletProvider)}>
            Create Pool here
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default CreatePoolComponent;