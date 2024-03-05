import { BookingObjectType } from "@/pages/MyReservations";
import { slotMapping } from "@/utils/constants/data";
import moment from "moment";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { RequestCardRows } from "./RequestCardRows";

interface ConfirmationModalProps {
  openModal: boolean;
  bookingData: BookingObjectType;
  onClose: (val: boolean) => void;
  onConfirm: () => void;
}

export const ConfirmationModal = ({
  onClose,
  openModal,
  onConfirm,
  bookingData,
}: ConfirmationModalProps) => {
  return (
    <Dialog
      open={openModal}
      onOpenChange={(val) => {
        onClose(val);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Confirmer</DialogTitle>
        </DialogHeader>
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
        </div>
        <DialogFooter className="flex justify-evenly">
          <DialogClose asChild>
            <Button type="submit" variant={"outline"}>
              Non non
            </Button>
          </DialogClose>
          <Button onClick={onConfirm} type="submit">
            Oui oui
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
