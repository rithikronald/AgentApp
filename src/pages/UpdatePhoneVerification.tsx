import { watt_connect_instance } from "@/App";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const UpdatePhoneVerification = () => {
  const {
    state: { phone },
  } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const updateAgentPhone = () => {
    const agent_id = localStorage.getItem("agent_id");
    if (agent_id) {
      watt_connect_instance
        .put(`/agents/${agent_id}/update_phone`, {
          phone_number: phone,
          code: otp,
        })
        .then((res) => {
          console.log("RESPONSE: update Agent phone details", res?.data);
          navigate("/profile");
        })
        .catch((err) => {
          console.log("ERROR: update Agent phone details", err);
        });
    } else {
      toast.error("Agent introuvable, veuillez réessayer de vous connecter");
    }
  };

  const validation = () => {
    if (otp) {
      updateAgentPhone();
    }
  };

  useEffect(() => {
    console.log("UPDATED PHONE", phone);
  }, [phone]);

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
