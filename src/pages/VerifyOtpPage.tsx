import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

export const VerifyOtpPage = () => {
  const [otp, setOtp] = useState("");

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
          onClick={() => {}}
          type="submit"
          className="rounded-full w-full mt-4"
        >
          Connexion
        </Button>
      </div>
    </div>
  );
};
