import React, { useState } from "react";

function GetDocs({ fetch }) {
  const [id, setId] = useState("");

  const displayInfo = (e) => {
    e.preventDefault();
    const data = fetch(id);
    console.log(data[1]);
  };

  return (
    <div className="formStyle">
      <h1>Collect your documents</h1>

      <input
        type="number"
        placeholder="Adhaar ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
      />
      <br />
      <button
        className="myButton"
        type="submit"
        onClick={(e) => displayInfo(e)}
      >
        Get Docs
      </button>
    </div>
  );
}

export default GetDocs;
