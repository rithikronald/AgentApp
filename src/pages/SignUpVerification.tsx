import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/utils/apiEndpoint";
import axios from "axios";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const SignUpVerification = () => {
  const {
    state: { phone, userData },
  } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const verifyOtp = () => {
    axios
      .post(
        BASE_URL + `agents/verify/check-code/?phone=%2B${phone}&code=${otp}`,
        {
          userData,
        }
      )
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
        <p className="flex font-semibold text-3xl">Saisissez votre OTP</p>
        <Input
          maxLength={10}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Saisissez votre OTP"
          className="rounded-xl h-14 focus-visible:ring-0"
        />
        <div className="flex items-center space-x-2">
          <Checkbox id="terms" />
          <label
            htmlFor="terms"
            className="text-sm font-extralight italic underline leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            J’accepte les termes et conditions du contrat
          </label>
        </div>
        <Button
          onClick={validation}
          type="submit"
          className="rounded-full w-full mt-4"
        >
          Inscrivez vous
        </Button>
      </div>
    </div>
  );
};
