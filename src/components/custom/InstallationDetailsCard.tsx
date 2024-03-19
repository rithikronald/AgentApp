import { watt_connect_instance } from "@/App";
import { BookingObjectType } from "@/pages/MyReservations";
import { slotMapping } from "@/utils/constants/data";
import moment from "moment";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { ConfirmationModal } from "./ConfirmationModal";
import { RequestCardRows } from "./RequestCardRows";
import { SuccessModal } from "./SuccessModal";

interface InstallationDetailsCardProps {
  bookingData: BookingObjectType;
  onConfirmBooking: () => void;
}

export const InstallationDetailsCard = ({
  bookingData,
  onConfirmBooking,
}: InstallationDetailsCardProps) => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const confirmBooking = () => {
    const agent_id = localStorage.getItem("agent_id");
    console.log("Booking data", bookingData);
    const booking_id = bookingData.booking_id;
    console.log("AGENT & BOOKING ID", agent_id, "  ", booking_id);
    if (agent_id && booking_id)
      watt_connect_instance
        .put(`/agents/${agent_id}/assign/${booking_id}`)
        .then((res) => {
          console.log("RESPONSE: Assign booking to agent", res?.data);
          onConfirmBooking();
          setOpenConfirmationModal(false);
          setOpenSuccessModal(true);
          toast.success("Booking assigned successfully");
        })
        .catch((err) => {
          console.log("ERROR: Assign booking to agent", err);
          toast.error("Something went wrong, please try again.");
        });
  };

  return (
    <div className="flex flex-col rounded-xl bg-[#F8FAFC] p-2">
      <div className="flex flex-col space-y-2">
        <RequestCardRows
          title="Numéro de réservation:"
          value={bookingData?.booking_id}
        />
        <RequestCardRows
          title="Fente:"
          value={`${moment(bookingData?.date).format("L")} ${
            slotMapping[bookingData?.time_slot]
          }`}
        />
        <RequestCardRows
          title="Non. De ̦thermostats:"
          value={bookingData?.thermostat_count?.toString()}
        />
        <RequestCardRows
          title="Nom:"
          value={`${bookingData?.first_name} ${bookingData?.last_name}`}
        />
        <RequestCardRows title="Adresse:" value={bookingData?.address} />
        <RequestCardRows title="Contact:" value={bookingData?.phone_number} />
        <RequestCardRows
          title="Distance:"
          value={bookingData?.distance?.toString() || "NAN"}
        />
        <Button
          onClick={() => setOpenConfirmationModal(true)}
          className="rounded-full mt-5"
        >
          accepter
        </Button>
      </div>
      <ConfirmationModal
        bookingData={bookingData}
        openModal={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
        onConfirm={() => {
          confirmBooking();
        }}
      />
      <SuccessModal
        openModal={openSuccessModal}
        onClose={() => setOpenSuccessModal(false)}
        onConfirm={() => {}}
      />
    </div>
  );
};
