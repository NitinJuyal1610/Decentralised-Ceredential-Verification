import React, { useState } from "react";

function GetDocs({ fetch }) {
  const [id, setId] = useState("");

  const displayInfo = (e) => {
    e.preventDefault();
    try {
      const data = fetch(id).then((result) => console.log(result));
      console.log(data, "this is data");
    } catch (e) {
      console.log("Error Fetching files", e);
    }
  };

  return (
    <div>
      <h1>Collect your documents</h1>
      <p>Enter your Aadhar number</p>
      <input type="number" value={id} onChange={(e) => setId(e.target.value)} />
      <button type="submit" onClick={(e) => displayInfo(e)}>
        Get Docs
      </button>
    </div>
  );
}

export default GetDocs;
