import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import publicInstance from "../Axios/PublicAxios";
import toast from "react-hot-toast";

import { MagnifyingGlass } from "react-loader-spinner";
import logo from "../../images/emailsucess.gif";

import "./email.css";

function VerifyEmail() {
  const { token } = useParams();
  const [isVerified, setVerified] = useState(false);
  const [countdown, setCountdown] = useState(9);
  const [FourNOtFour, set404] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const verifyEmail = async () => {
      setTimeout(async () => {
        try {
          const response = await publicInstance.get(`verify-email/${token}/`);
          setVerified(true);
          console.log(response.data);
          toast.success(response.data.message);
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setTimeout(() => {
              set404(true);
            }, 5000);
            toast.error(
              "Email verification link is invalid or expired. \n Please register your account"
            );
          }
        }
      }, 5000);
    };

    verifyEmail();
  }, [token]);

  useEffect(() => {
    let timeoutId;
    if (isVerified) {
      setTimeout(() => {
        window.location.href = "http://localhost:5173/login";
      }, 10000);
    }

    return () => clearTimeout(timeoutId);
  }, [isVerified, navigate]);

  useEffect(() => {
    let countdownId;
    if (isVerified && countdown > 0) {
      countdownId = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => clearTimeout(countdownId);
  }, [isVerified, countdown]);

  return !isVerified ? (
    <div className="flex-center">
      {!FourNOtFour ? (
        <div className="text-center">
          <MagnifyingGlass
            color="#FFBF07"
            size={300}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <h1 className="emailverify text-4xl mt-8">
            Verifying your email....
          </h1>
        </div>
      ) : (
        (window.location.href = "http://localhost:5173/login")
      )}
    </div>
  ) : (
    <div className="main h-screen">
      <div className="textparent">
        <h1 className="verified text-3xl">
          Email verified{" "}
          <i className="fa-sharp fa-solid fa-circle-check fa-beat"></i>
        </h1>
        <img src={logo} className="img-fluid imgsucess" alt="Success image" />
        <h4 className="redirect-message text-xl">
          You will be automatically redirected to the login page in{" "}
          <span className="counterdisplay "> 00:0 {countdown} </span>seconds.
        </h4>
      </div>
    </div>
  );
}

export default VerifyEmail;