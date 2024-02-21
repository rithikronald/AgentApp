import { CustomInput } from "@/components/custom/customInput";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataInterface } from "./LandingPage";

export const ThermostatPage = () => {
  const navigate = useNavigate();
  const [thermoStatQuantity, setThermoStatQuantity] = useState(1);
  const [area, setArea] = useState(1);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData?.thermoStatQuantity && userData?.area) {
      setThermoStatQuantity(userData?.thermoStatQuantity);
      setArea(userData?.area);
    }
    console.log("USER DATA", userData);
  }, []);

  const validation = async () => {
    if (area > 0 && thermoStatQuantity > 0) {
      let userData = JSON.parse(localStorage.getItem("userData"));
      console.log("final----", userData);
      userData = {
        ...userData,
        thermoStatQuantity: thermoStatQuantity,
        area: area,
      };
      await localStorage.setItem("userData", JSON.stringify(userData));
      navigate("/address");
    }
  };

  return (
    <div className="flex flex-1 h-[100%] flex-col justify-evenly items-center md:h-[70%]">
      <div className="flex flex-col items-center">
        <p className="flex font-semibold text-3xl">
          How many thermostats you have?
        </p>
        <CustomInput
          value={thermoStatQuantity.toString()}
          onChange={(val) => setThermoStatQuantity(Number(val))}
          title="Select quantity"
          className="mt-8 w-full md:w-[70%]"
        />
      </div>
      <div className="flex flex-col items-center">
        <p className="flex font-semibold text-3xl">
          What is the Area of your house in sq.m?
        </p>
        <CustomInput
          value={area.toString()}
          onChange={(val) => setArea(Number(val))}
          title="Select Area (sq.m)"
          className="mt-8 w-full md:w-[70%]"
        />
      </div>
      <Button onClick={validation} className="w-[200px] mt-10" type="submit">
        Next
      </Button>
    </div>
  );
};
