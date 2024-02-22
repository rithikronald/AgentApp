import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

interface SuccessModalProps {
  openModal: boolean;
  onClose: (val: boolean) => void;
  onConfirm: () => void;
}

export const SuccessModal = ({
  openModal,
  onClose,
  onConfirm,
}: SuccessModalProps) => {
  return (
    <Dialog
      open={openModal}
      onOpenChange={(val) => {
        onClose(val);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          {/* <DialogTitle>Confirmer</DialogTitle> */}
        </DialogHeader>
        <div className="flex flex-col space-y-2">
          <p className="text-black font-semibold text-2xl">
            Réservation acceptée avec succès!
          </p>
          <p className="text-muted-foreground font-light">
            Vous trouverez plus de détails dans ma réservation. Contactez le
            client et confirmez le timing
          </p>
          <Button onClick={onConfirm} type="submit">
            Mes Réservations
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
