import React, { useState } from "react";

function OwnerVerify({ ownerVerify }) {
  const [add, setadd] = useState("");
  return (
    <div>
      <form
        className="formStyle"
        onSubmit={(e) => {
          e.preventDefault();
          ownerVerify(add);
        }}
      >
        <h1 htmlFor="">Register Institute address </h1>

        <input
          type="text"
          name="address"
          value={add}
          onChange={(e) => setadd(e.target.value)}
          placeholder="Metamask Wallet Address"
        ></input>
        <br />
        <button className="myButton">Register</button>
      </form>
    </div>
  );
}

export default OwnerVerify;
