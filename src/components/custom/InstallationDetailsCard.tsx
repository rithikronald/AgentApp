import { useState } from "react";
import { Button } from "../ui/button";
import { ConfirmationModal } from "./ConfirmationModal";
import { RequestCardRows } from "./RequestCardRows";
import { SuccessModal } from "./SuccessModal";

export const InstallationDetailsCard = () => {
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  return (
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
