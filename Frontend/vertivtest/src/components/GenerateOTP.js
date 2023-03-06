import React, { useRef } from "react";
import classes from "./GenerateOTP.module.css";

const GenerateOTP = (props) => {
  const userIDRef = useRef();

  const generateOTPHandler = async (event) => {
    event.preventDefault();
    const userID = userIDRef.current.value;
    const response = await fetch(
      `https://localhost:7239/api/Home/GenerateOTP?userID=${userID}`
    );
    if (response.ok) {
      const data = await response.json();
      props.onOTPGenerated(data.toString(), userID);
    }
  };

  return (
    <main className={classes.userform}>
      <section>
        <form onSubmit={generateOTPHandler}>
          <div className={classes.control}>
            <label htmlFor="UserID">UserID</label>
            <input type="text" id="UserID" ref={userIDRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="DateTime">DateTime</label>
            <input
              type="DateTime"
              id="DateTime"
              value={Date().toString().substring(4, 24)}
              readOnly
            />
          </div>
          <button>Generate OTP</button>
        </form>
      </section>
    </main>
  );
};

export default GenerateOTP;
