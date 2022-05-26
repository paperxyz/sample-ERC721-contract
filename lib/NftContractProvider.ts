// The name below ("YourNftToken") should match the name of your Solidity contract.
// It can be updated using the following command:
// yarn rename-contract NEW_CONTRACT_NAME
// Please DO NOT change it manually!
import { ethers } from "hardhat";
import { PaperERC721Template as ContractType } from "../typechain/index";
import CollectionConfig from "./../config/CollectionConfig";

export default class NftContractProvider {
  public static async getContract(): Promise<ContractType> {
    // Check configuration
    if (CollectionConfig.contractAddress === null) {
      throw new Error(
        "\x1b[31merror\x1b[0m " +
          "Please add the contract address to the configuration before running this command."
      );
    }

    if (
      (await ethers.provider.getCode(CollectionConfig.contractAddress)) === "0x"
    ) {
      throw new Error(
        "\x1b[31merror\x1b[0m " +
          `Can't find a contract deployed to the target address: ${CollectionConfig.contractAddress}`
      );
    }

    return (await ethers.getContractAt(
      CollectionConfig.contractName,
      CollectionConfig.contractAddress
    )) as ContractType;
  }
}

export type NftContractType = ContractType;
