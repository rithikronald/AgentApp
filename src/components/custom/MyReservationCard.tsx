import React from "react";
import { RequestCardRows } from "./RequestCardRows";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";

interface MyReservationCardProps {
  isDetailsPage?: boolean;
  onClick?: () => void;
}

export const MyReservationCard = ({
  isDetailsPage,
  onClick,
}: MyReservationCardProps) => {
  return (
    <div className="flex flex-col space-y-4 mt-5">
      <div className="flex flex-col rounded-xl bg-[#F8FAFC] p-2">
        <div className="flex flex-col space-y-2">
          <RequestCardRows title="Numéro de réservation:" value="522558" />
          <RequestCardRows title="Fente:" value="12/02/2024 12:00 am" />
          <RequestCardRows title="Non. De ̦thermostats:" value="5" />
          <RequestCardRows title="Nom:" value="Marie" />
          <RequestCardRows
            title="Adresse:"
            value="rue 31, rue des canaries Paris"
          />
          <RequestCardRows title="Contact:" value="+33 58 55 88 00" />
          <RequestCardRows title="Distance:" value="5.7 KM" />
          <p className="text-black font-normal font-semibold">confirmé</p>
          {isDetailsPage ? (
            <div className="flex items-center space-x-2">
              <Label>En dehors</Label>
              <Switch />
              <Label>Sur le</Label>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Label>Non non</Label>
              <Switch />
              <Label>Oui oui</Label>
            </div>
          )}
          {isDetailsPage ? (
            <p className="text-black">Télécharger l’image de l’installation</p>
          ) : (
            <Button
              onClick={() => onClick()}
              className="rounded-full w-[60%] self-center"
            >
              Voir la
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
