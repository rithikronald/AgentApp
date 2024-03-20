import { RequestCardRows } from "./RequestCardRows";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { BookingObjectType } from "@/pages/MyReservations";
import moment from "moment";
import { slotMapping } from "@/utils/constants/data";
import { useState } from "react";
import { CancelBookingModal } from "./CancelBookingModal";
import { watt_connect_instance } from "@/App";
import { toast } from "react-toastify";

interface MyReservationCardProps {
  data: BookingObjectType;
  showSwitch?: boolean;
  onClick?: () => void;
  agent_id: string;
}

export const MyReservationCard = ({
  data,
  showSwitch,
  onClick,
  agent_id,
}: MyReservationCardProps) => {
  const [confirmStatus, setConfirmStatus] = useState(true);
  const [openCancelationModal, setOpenCancelationModal] = useState(false);

  const cancelBooking = () => {
    watt_connect_instance
      .put(`/agents/${agent_id}/cancel/${data?.booking_id}`)
      .then((res) => {
        console.log("RESPONSE: cancel booking", res?.data);
        setOpenCancelationModal(false);
        toast.success("Réservation annulée avec succès.");
      })
      .catch((err) => {
        console.log("ERROR: cancel booking", err);
      });
  };

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
                    setConfirmStatus((prev) => {
                      if (prev) {
                        setOpenCancelationModal(true);
                      }
                      return !prev;
                    });
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
      <CancelBookingModal
        openModal={openCancelationModal}
        onClose={() => {
          setOpenCancelationModal(false);
          setConfirmStatus(true);
        }}
        onConfirm={() => {
          cancelBooking();
        }}
      />
    </div>
  );
};
