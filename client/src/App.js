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
      .send({ from: Web3Data.accounts[0] })
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
          SetComp(<div className="error">You are not authorised!</div>);
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
              <p>
                <strong>Student Name:</strong> {data[3]}
              </p>
              <p>
                <strong>Student Id:</strong> {data[0]}
              </p>
              <p>
                <strong>Data Uploaded:</strong> {data[4]}
              </p>
              <p>
                <strong>Uploader Address:</strong> {data[2]}
              </p>
              Document
              <a href={url} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                  <path d="M384 128h-128V0L384 128zM256 160H384v304c0 26.51-21.49 48-48 48h-288C21.49 512 0 490.5 0 464v-416C0 21.49 21.49 0 48 0H224l.0039 128C224 145.7 238.3 160 256 160zM255 295L216 334.1V232c0-13.25-10.75-24-24-24S168 218.8 168 232v102.1L128.1 295C124.3 290.3 118.2 288 112 288S99.72 290.3 95.03 295c-9.375 9.375-9.375 24.56 0 33.94l80 80c9.375 9.375 24.56 9.375 33.94 0l80-80c9.375-9.375 9.375-24.56 0-33.94S264.4 285.7 255 295z" />
                </svg>
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
          <h1>Dokify</h1>
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
