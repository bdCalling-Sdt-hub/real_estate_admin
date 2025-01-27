import { Link } from "react-router-dom";
import image from "../assets/header/verify.png";
import { Button, Checkbox, Form, Input } from "antd";
import { useState } from "react";
import OTPInput from "react-otp-input";

const Verify = () => {
  // const onFinish = async (values) => {
  //   console.log(values);
  // };
  const [otp, setOtp] = useState("");
  return (
    <div className="min-h-screen grid grid-cols-2 bg-white">
      <div className="flex justify-center items-center">
        <img src={image} alt="" />
      </div>
      <div className="bg-[#EAE9F0] min-h-screen flex items-center justify-center">
        <div className="">
        <div className="bg-white lg:w-[500px] md:px-16 px-5 py-16 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Check your email
          </h2>
          <h3 className="text-[#333333] text-center mb-5">
            We sent a reset link to { "your email"}. Enter the 5-digit
            code mentioned in the email.
          </h3>
          <div className="flex justify-center mb-5">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={5}
              renderSeparator={<span className="mx-1"></span>}
              renderInput={(props) => (
                <input
                  {...props}
                  className="w-16 h-16 text-center bg-white text-lg border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  style={{ width: "40px", height: "50px" }}
                />
              )}
            />
          </div>
          <Link to={'/reset'}>
          <button
            // onClick={handleVerify}
            className="w-full py-2 bg-[#2A216D] text-white rounded-md mb-4"
          >
            Verify Code
          </button></Link>

          <span className="flex justify-center">
            You have not received the email?{" "}
            <span
              className="text-[#2A216D] cursor-pointer"
              // onClick={handleResend}
            >
              Resend
            </span>
          </span>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
