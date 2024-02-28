import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/utils/apiEndpoint";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const {
    state: { phone },
  } = useLocation();
  const [otp, setOtp] = useState("");

  useEffect(() => {
    console.log("PHONE", phone);
  }, [phone]);

  const verifyOtp = () => {
    axios
      .get(BASE_URL + `agents/verify/check-code/?phone=%2B${phone}&code=${otp}`)
      .then((res) => {
        console.log("RESPONSE", res?.data);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log("ERROR: GET OTP", err);
      });
  };

  const validation = () => {
    if (otp) {
      verifyOtp();
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-evenly items-center md:h-[70%]">
      <div className="flex w-[95%] flex-col gap-y-6 items-center md:w-[40%]">
        <p className="flex font-semibold text-3xl">
          Saisissez votre mot de passe à usage unique
        </p>
        <Input
          maxLength={10}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Saisissez votre OTP"
          className="rounded-l-none h-14 focus-visible:ring-0"
        />
        <Button
          onClick={validation}
          type="submit"
          className="rounded-full w-full mt-4"
        >
          Connexion
        </Button>
      </div>
    </div>
  );
};
