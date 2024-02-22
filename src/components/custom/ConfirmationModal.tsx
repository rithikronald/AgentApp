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
  onClose: (val: boolean) => void;
  onConfirm: () => void;
}

export const ConfirmationModal = ({
  onClose,
  openModal,
  onConfirm,
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
          <RequestCardRows title="Numéro de réservation:" value="522558" />
          <RequestCardRows title="Fente:" value="12/02/2024 12:00 am" />
          <RequestCardRows title="Non. De thermostats:" value="5" />
          <RequestCardRows title="Nom:" value="Marie" />
          <RequestCardRows
            title="Adresse:"
            value="rue 31, rue des canaries Paris"
          />
          <RequestCardRows title="Contact:" value="+33 58 55 88 00" />
          <RequestCardRows title="Distance:" value="5.7 KM" />
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
