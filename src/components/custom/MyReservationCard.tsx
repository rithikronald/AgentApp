import { RequestCardRows } from "./RequestCardRows";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { BookingObjectType } from "@/pages/MyReservations";
import moment from "moment";
import { slotMapping } from "@/utils/constants/data";
import { useState } from "react";

interface MyReservationCardProps {
  data: BookingObjectType;
  showSwitch?: boolean;
  onClick?: () => void;
}

export const MyReservationCard = ({
  data,
  showSwitch,
  onClick,
}: MyReservationCardProps) => {
  const [confirmStatus, setConfirmStatus] = useState(true);

  return (
    <div className="flex flex-col space-y-4 mt-5">
      <div className="flex flex-col rounded-xl bg-[#F8FAFC] p-2">
        <div className="flex flex-col space-y-2">
          <RequestCardRows
            title="Numéro de réservation:"
            value={data?.booking_id}
          />
          <RequestCardRows
            title="Fente:"
            value={`${moment(data?.date).format("L")} ${
              slotMapping[data?.time_slot]
            }`}
          />
          <RequestCardRows
            title="Non. De ̦thermostats:"
            value={data?.thermostat_count.toString()}
          />
          <RequestCardRows
            title="Nom:"
            value={`${data?.first_name} ${data?.last_name}`}
          />
          <RequestCardRows title="Adresse:" value={data?.address} />
          <RequestCardRows title="Contact:" value={data?.phone_number} />
          <RequestCardRows
            title="Distance:"
            value={data?.distance?.toString()}
          />
          {showSwitch && (
            <>
              <p className="text-black font-semibold">confirmé</p>
              <div className="flex items-center space-x-2">
                <Label>Non non</Label>
                <Switch
                  checked={confirmStatus}
                  onClick={() => {
                    setConfirmStatus((prev) => !prev);
                  }}
                />
                <Label>Oui oui</Label>
              </div>
              <Button
                onClick={onClick}
                className="rounded-full w-[60%] self-center"
              >
                Voir la
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
