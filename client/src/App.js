import React from "react";
import MainContract from "./contracts/Main.json";
import OwnerVerify from "./components/OwnerVerify";
import getWeb3 from "./getWeb3";
import { useEffect, useState } from "react";

function App() {
  const [Web3Data, SetWeb3Data] = useState({
    web3: null,
    accounts: null,
    contract: null,
  });

  const loadWeb3 = async () => {
    //connect web3 with http provider
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = MainContract.networks[networkId];
      const instance = new web3.eth.Contract(
        MainContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      SetWeb3Data(
        Object.assign(Web3Data, {
          web3: web3,
          accounts: accounts,
          contract: instance,
        })
      );

      console.log(Web3Data);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  const sendDocs = async (hash, date, id, name) => {
    await Web3Data.contract.methods
      .StoreDocument(hash, date, id, name)
      .send({ from: Web3Data.accounts[0], gas: 5000000 })
      .on("transactionHash", function (hash) {
        console.log("Successfully uploaded.");
        console.log(hash);
      });
  };

  const ownerVerify = async (address) => {
    await Web3Data.contract.methods
      .ownerVerification(address)
      .send({ from: Web3Data.accounts[0] });
  };

  useEffect(() => {
    loadWeb3();
  }, []);

  return (
    <div className="App">
      <OwnerVerify ownerVerify={ownerVerify} />
    </div>
  );
}

export default App;
