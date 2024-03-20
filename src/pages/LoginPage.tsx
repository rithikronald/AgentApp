import { watt_connect_instance } from "@/App";
import { LoaderButton } from "@/components/custom/loaderButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  extractCountryCode,
  retrieveNumberFromString,
} from "@/utils/helperfunction";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import countries from "../utils/constants/countries.json";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("8825560958");
  // const [countryName, setCountryName] = useState("🇫🇷 (+33)");
  const [countryName, setCountryName] = useState("🇮🇳 (+91)");
  const [isLoading, setIsLoading] = useState(false);

  const getOtp = () => {
    const number = `${extractCountryCode(countryName)} ${phoneNumber}`;
    console.log("Number", number);
    watt_connect_instance
      .post("/verify/send-code", {
        phone_number: number,
      })
      .then((res) => {
        console.log("RESPONSE", res?.data);
        toast.success("Otp envoyé avec succès.");
        navigate("/verify_otp", {
          state: {
            phone: `${retrieveNumberFromString(countryName)}${phoneNumber}`,
          },
        });
      })
      .catch((err) => {
        console.log("ERROR: GET OTP", err);
        toast.error("Erreur lors de l'envoi d'OTP, veuillez réessayer.");
        setIsLoading(false);
      });
  };

  const validation = () => {
    setIsLoading(true);
    if (phoneNumber.length == 10) {
      getOtp();
    } else {
      toast.error("S'il vous plait, entrez un nombre valide.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-evenly items-center md:h-[70%]">
      <div className="flex w-[95%] flex-col gap-y-6 items-center md:w-[40%]">
        <p className="flex font-semibold text-3xl">Se connecter</p>
        <div className="flex w-full">
          <select
            id="countries"
            value={countryName}
            onChange={(e) => {
              console.log(e.target.value);
              setCountryName(e.target.value);
            }}
            className="text-md w-[110px] h-14 focus-visible:ring-0 rounded-md border border-input bg-background px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none  focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 rounded-r-none"
          >
            {countries.map((item, index) => {
              return (
                <option key={index}>
                  {item?.flag} ({item?.dial_code})
                </option>
              );
            })}
          </select>
          <Input
            maxLength={10}
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Entrez votre numéro de mobile "
            className="rounded-l-none h-14 focus-visible:ring-0"
          />
        </div>
        <LoaderButton
          isLoading={isLoading}
          onClick={validation}
          className="rounded-full w-full mt-4"
        >
          Obtenir OTP
        </LoaderButton>
        <Button
          onClick={() => {
            navigate("/register");
          }}
          type="submit"
          className="rounded-full w-full"
        >
          Créer un nouveau compte
        </Button>
        <p className="text-muted-foreground text-sm mt-4">
          Inscrivez-vous en tant qu'installateur agréé My Watt et courez la
          chance de gagner de l'argent sur votre installation
        </p>
      </div>
    </div>
  );
};
