import { useState } from "react";
import { Button } from "../ui/button";
import { ConfirmationModal } from "./ConfirmationModal";
import { RequestCardRows } from "./RequestCardRows";
import { SuccessModal } from "./SuccessModal";
import { slotMapping } from "@/utils/constants/data";
import moment from "moment";
import { BookingObjectType } from "@/pages/MyReservations";

interface InstallationDetailsCardProps {
  bookingData: BookingObjectType;
}

export const InstallationDetailsCard = ({
  bookingData,
}: InstallationDetailsCardProps) => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
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
        openModal={openConfirmationModal}
        onClose={() => setOpenConfirmationModal(false)}
        onConfirm={() => {
          setOpenConfirmationModal(false);
          setOpenSuccessModal(true);
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
