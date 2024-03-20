import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

interface CancelBookingModalProps {
  openModal: boolean;
  onClose: (val: boolean) => void;
  onConfirm: () => void;
}

export const CancelBookingModal = ({
  openModal,
  onClose,
  onConfirm,
}: CancelBookingModalProps) => {
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
          <p>Etes-vous sûr de vouloir annuler la réservation ?</p>
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
