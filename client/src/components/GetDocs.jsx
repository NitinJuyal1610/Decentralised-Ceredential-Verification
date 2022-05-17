import React, { useState } from 'react'

function GetDocs({fetch}) {
  const [id, setId] = useState(null);

  const handleChange=(e) => {
    e.preventDefault();
    const data = fetch(id);
    console.log(data);
  }
  
  return (
      <div>
          <h1>Collect your documents</h1>
          <p>Enter your Aadhar number</p>
          <input type="number"
              value={id}
              onChange={(e)=>setId(e.target.value)}
          />
      <button type="submit" onSubmit={(e)=>handleChange(e)} >Get Docs</button>
    </div>
  )
}

export default GetDocs