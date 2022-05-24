import React, { useState } from "react";
import { create } from "ipfs-http-client";
const client = create("https://ipfs.infura.io:5001/api/v0");

function StudentVerify({ studentVerify }) {
  const [file2, setFile] = useState(null);
  const [id, setId] = useState("0");

  function handleInfo(e) {
    e.preventDefault();
    const value = e.target.value;
    setId(value);
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
      const added = await client.add(file2);
      const hash = added.path;
      studentVerify(hash, id);
    } catch (e) {
      console.log("Error Uploading File", e);
    }
  }
  return (
    <>
      <form className="formStyle" onSubmit={(e) => addToIpfs(e)}>
        <h1>Verify the Document here</h1>
        <p>Enter Your Id here</p>
        <input
          type="text"
          name="id"
          value={id || ""}
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
           <br />
          <button className="myButton" type="submit">
            Upload
          </button>
        </div>
      </form>
    </>
  );
}

export default StudentVerify;
