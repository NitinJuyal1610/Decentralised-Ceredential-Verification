import React from "react";
import MainContract from "./contracts/Main.json";
import OwnerVerify from "./components/OwnerVerify";
import getWeb3 from "./getWeb3";
import Upload from "./components/Upload";
import { useEffect, useState } from "react";
import "./App.css";
import StudentVerify from "./components/StudentVerify";
import GetDocs from "./components/GetDocs";
import imgg from "./components/homePage.jpg";

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
      .send({ from: Web3Data.accounts[0] })
      .on("transactionHash", function (hash) {
        console.log("Successfully Registered.");
        console.log(hash);
      });
  };

  const studentVerify = async (hash, id) => {
    await Web3Data.contract.methods
      .verify(hash, id)
      .send({ from: Web3Data.accounts[0] })
      .on("transactionHash", function (hash) {
        console.log("Successfully Verified.");
        console.log(hash);
      });
  };

  const fetch = async (id) => {
    try {
      await Web3Data.contract.methods
        .GetDoc(id)
        .call({ from: Web3Data.accounts[0] })
        .then((result) => console.log(result));
    } catch (e) {
      console.log("An error Occured ", e);
    }
  };

  useEffect(() => {
    loadWeb3();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <div className="Nav">
          <h1>Credify</h1>
          <div>
            <ul
              style={{
                display: "flex",
                gap: "30px",
                listStyle: " none",
                fontSize: "18px",
              }}
            >
              <li href="#">Home</li>
              <li href="#">VerifyDocs</li>
              <li href="#">GetDocs</li>
              <li href="#">StoreDocs</li>
            </ul>
          </div>
        </div>

        <div className="about">
          <p className="Header">Lorem ipsum dolor sit amet</p>
          <p className="para">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
          </p>

          <button className="button"> RockOn</button>
        </div>

        <img src={imgg} className="imgg" alt="image here" />
      </div>
    </div>
  );
}

export default App;
