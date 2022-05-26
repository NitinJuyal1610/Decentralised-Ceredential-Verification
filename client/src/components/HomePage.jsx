import React from "react";
// import imgg from "./bg.jpeg";
import "animate.css";

export default function HomePage() {
  return (
    <div>
      <>
        <div className="about">
          <p className="Header animate__slideInDown">
            Credentials Storage & Verification Using Blockchain.
          </p>
          <p className="para">
            Presenting a new decentralised app for certificates storage and
            validation and making it transparent.
          </p>
        </div>
        {/* <img src={imgg} className="imgg" alt="image here" /> */}
      </>
    </div>
  );
}
