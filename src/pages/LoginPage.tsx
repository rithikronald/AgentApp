import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import countries from "../utils/constants/countries.json";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryName, setCountryName] = useState("🇫🇷 (+33)");

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
        <Button
          onClick={() => {
            navigate("/verify_otp");
          }}
          type="submit"
          className="rounded-full w-full mt-4"
        >
          Obtenir OTP
        </Button>
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
