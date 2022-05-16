import React, { useState } from "react";
import { create } from "ipfs-http-client";
const client = create("https://ipfs.infura.io:5001/api/v0");

const Upload = ({sendDocs}) => {
  const [file, setFile] = useState(null);
  const [info, setInfo] = useState({
    name: "",
    id: 0,
  });

  function handleInfo(e) {
    e.preventDefault();
    const value = e.target.value;
    setInfo({
      ...info,
      [e.target.name]: value,
    });
  }

  const retrieveFile = (e) => {
    const data = e.target.files[0];
    const reader = new window.FileReader();
    reader.readAsArrayBuffer(data);
    reader.onloadend = () => {
      setFile(Buffer(reader.result));
    };

    e.preventDefault();
  };

  async function addToIpfs(e) {
    e.preventDefault();
    try {
      const added = await client.add(file);
      const hash = added.path;
      const current = new Date();
      const date = `${current.getDate()}/${
        current.getMonth() + 1
      }/${current.getFullYear()}`;
      console.log(file, hash, date, info.name,info.id);
      sendDocs(hash,date,info.id,info.name);
      
    } catch (e) {
      console.log("Error Uploading File", e);
    }
  }

  return (
    <>
      <form className="formStyle" onSubmit={(e) => addToIpfs(e)}>
        <h1>Upload the Document here</h1>
        <p>Enter Your Name here</p>
        <input
          type="text"
          name="name"
          value={info.name}
          onChange={(e) => handleInfo(e)}
          placeholder="Name.."
          required
        ></input>
        <p>Enter Your Id here</p>
        <input
          type="text"
          name="id"
          value={info.id}
          onChange={(e) => handleInfo(e)}
          placeholder="Id.."
          required
        ></input>
        <div>
          <input
            className="Upload"
            type="file"
            onChange={(e) => retrieveFile(e)}
            name="file"
          />
          <button type="submit">Upload</button>
        </div>
      </form>
    </>
  );
};

export default Upload;
