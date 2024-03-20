import { watt_connect_instance } from "@/App";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
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
    watt_connect_instance
      .post(`/agents/verify/check-code/?phone=%2B${phone}&code=${otp}`)
      .then((res) => {
        console.log("RESPONSE", res?.data);
        watt_connect_instance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res?.data?.access_token}`;
        localStorage.setItem("agent_id", res?.data?.agent_id);
        localStorage.setItem("access_token", res?.data?.access_token);
        localStorage.setItem("refresh_token", res?.data?.refresh_token);
        navigate("/");
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
