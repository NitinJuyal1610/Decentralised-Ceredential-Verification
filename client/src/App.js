import React from "react";
import MainContract from "./contracts/Main.json";
import OwnerVerify from "./components/OwnerVerify";
import getWeb3 from "./getWeb3";
import Upload from "./components/Upload";
import { useEffect, useState } from "react";
import "./App.css";
import StudentVerify from "./components/StudentVerify";
import GetDocs from "./components/GetDocs";
import HomePage from "./components/HomePage";

function App() {
  const [Web3Data, SetWeb3Data] = useState({
    web3: null,
    accounts: null,
    contract: null,
  });

  const [Loading, SetLoading] = useState(true);
  const [Cert, setCert] = useState("");
  const [comp, SetComp] = useState(<HomePage />);

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
      SetLoading(false);

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
      .on("transactionHash", (hash) => {
        console.log("TX Hash", hash);
      })
      .then((receipt) => {
        console.log("Mined", receipt);
        SetComp(<div className="success">Successfully Uploaded Docs</div>);
      })
      .catch((err) => {
        console.log("Error", err);
        SetComp(<div className="error">Error Uploading ,Try Again!</div>);
      })
      .finally(() => {
        console.log("Extra Code After Everything");
      });
  };

  const ownerVerify = async (address) => {
    try {
      await Web3Data.contract.methods
        .ownerVerification(address)
        .send({ from: Web3Data.accounts[0] })
        .on("transactionHash", (hash) => {
          console.log("TX Hash", hash);
        })
        .then((receipt) => {
          console.log("Mined", receipt);
          SetComp(<div className="success">Successfully Added Institute</div>);
        })
        .catch((err) => {
          console.log("Error", err);
          SetComp(<div className="error">No such Address present!</div>);
        })
        .finally(() => {
          console.log("Extra Code After Everything");
        });
    } catch (err) {
      console.log("Invalid Parameters");
    }
  };

  const studentVerify = async (hash, id) => {
    try {
      await Web3Data.contract.methods
        .verify(hash, id)
        .send({ from: Web3Data.accounts[0] })
        .on("transactionHash", (hash) => {
          console.log("TX Hash", hash);
        })
        .then((receipt) => {
          console.log("Mined", receipt);
          SetComp(<div className="success">Successfully Verified</div>);
        })
        .catch((err) => {
          SetComp(<div className="error">Fake Document</div>);
        })
        .finally(() => {
          console.log("Extra Code After Everything");
        });
    } catch (e) {
      SetComp(<div className="error">Error Occured While uploading doc!</div>);
    }
  };

  const fetch = async (id) => {
    try {
      await Web3Data.contract.methods
        .GetDoc(id)
        .call({ from: Web3Data.accounts[0] })
        .then((data) => {
          console.log(data);
          const url = `https://ipfs.io/ipfs/${data[1]}`;
          setCert(
            <div className="Card">
              <p>Uploader: {data[3]}</p>
              <p>Uploader Address: {data[2]}</p>
              <p>Uploader Id: {data[0]}</p>
              <p>Data Uploader: {data[4]}</p>

              <a href={url} target="_blank">
                Document
              </a>
            </div>
          );
        })
        .catch((err) => {
          console.log("Error", err);
          SetComp(<div className="error">Verify First!</div>);
        });
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
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    SetComp(<HomePage />);
                    setCert("");
                    e.preventDefault();
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    SetComp(<StudentVerify studentVerify={studentVerify} />);
                    setCert("");
                    e.preventDefault();
                  }}
                >
                  VerifyDocs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    SetComp(<GetDocs fetch={fetch} />);
                    setCert("");
                    e.preventDefault();
                  }}
                >
                  GetDocs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    SetComp(<Upload sendDocs={sendDocs} />);
                    setCert("");
                    e.preventDefault();
                  }}
                >
                  StoreDocs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    SetComp(<OwnerVerify ownerVerify={ownerVerify} />);
                    setCert("");
                    e.preventDefault();
                  }}
                >
                  Register Institute
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* <HomePage /> */}
        {comp}
        <br />
        {Cert}
      </div>
    </div>
  );
}

export default App;
