import React from "react";
import imgg from "./homePage.jpg";

export default function HomePage() {
  return (
    <div>
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
