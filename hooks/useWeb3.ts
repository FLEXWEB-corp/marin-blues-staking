import { useEffect, useState } from 'react';
import Web3 from 'web3';
import Abi from '../assets/MarineBluesABI.json';
const Web3EthContract = require('web3-eth-contract');

const ABI_CONTRACT_ADDRESS = '0x4FC288418B3e63c7700B741455A81Cd15c1E96c0';

const useWeb3 = () => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [smartContract, setSmartContract] = useState<any | null>(null);

  const getWeb3 = async () => {
    try {
      if (window.ethereum) {
        Web3EthContract.setProvider(window.ethereum);
        setWeb3(new Web3(window.ethereum as any));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!web3) getWeb3();
    else {
      (async () => {
        setSmartContract(new Web3EthContract(Abi, ABI_CONTRACT_ADDRESS));
      })();
    }
  }, [web3]);

  return [web3, smartContract];
};

export default useWeb3;
