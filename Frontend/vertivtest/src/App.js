import React, { useState } from 'react';
import GenerateOTP from "./components/GenerateOTP";
import Header from "./components/Header";
import ValidateOTP from './components/ValidateOTP';

function App() {
  const [isOTPGenerated, setIsOTPGenerated] = useState(false);
  const [otp, setOtp] = useState('');
  const [userID, setUserID] = useState('');
  

  const OTPGeneratedhandler = (otp, userID) => {
    setIsOTPGenerated(true);
    setOtp(otp);
    setUserID(userID);
  }

  
  return (
    <>
    <Header/>
    {isOTPGenerated? 
    <ValidateOTP userID={userID} otp={otp} />
    :<GenerateOTP onOTPGenerated = {OTPGeneratedhandler}/>}
    </>
  );
}

export default App;
