import React, { useState } from "react";

function OwnerVerify({ ownerVerify }) {
  const [add, setadd] = useState("");
  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          ownerVerify(add);
        }}
      >
        <label htmlFor="">Register Institute address </label>
        <br />
        <br />
        <input
          type="text"
          name="address"
          value={add}
          onChange={(e) => setadd(e.target.value)}
          placeholder="0xEC5a998A3C04D1900ce13a3055e567Cf82e55abc"
        ></input>
        <button>Register</button>
      </form>
    </div>
  );
}

export default OwnerVerify;
