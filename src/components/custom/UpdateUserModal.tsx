import { DialogDescription } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";

interface UpdateUserModalProps {
  openModal: boolean;
  agentData: unknown;
  onClose: (val: boolean) => void;
  onConfirm: (agentData: unknown) => void;
}

export const UpdateUserModal = ({
  agentData,
  onClose,
  onConfirm,
  openModal,
}: UpdateUserModalProps) => {
  const [agentDetails, setAgentDetails] = useState();

  useEffect(() => {
    setAgentDetails(agentData);
    console.log("Agent Data", agentData);
  }, [agentData]);

  return (
    <Dialog
      open={openModal}
      onOpenChange={(val) => {
        onClose(val);
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Renseignements personnels</DialogTitle>
          <DialogDescription>
            Mettre à jour les informations personnelles
          </DialogDescription>
        </DialogHeader>
        {agentDetails ? (
          <div className="flex flex-col space-y-2">
            <div className="flex flex-col space-y-2">
              <p className="text-sm">Nom</p>
              <Input
                value={agentDetails?.first_name}
                onChange={(e) => {
                  setAgentDetails((prev) => {
                    console.log("PREV", prev);
                  });
                  console.log(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm">Prénom</p>
              <Input value={agentDetails?.last_name} />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm">Zone de Service</p>
              <Input value={agentDetails?.service_area} />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm">Contact</p>
              <Input value={agentDetails?.phone} />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm">Numéro de compte</p>
              <Input value={agentDetails?.account_no} />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm">Code de la branche</p>
              <Input value={agentDetails?.branch_code} />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm">Nom de la banque</p>
              <Input value={agentDetails?.bank_name} />
            </div>
          </div>
        ) : (
          <Bars
            height="20"
            width="20"
            color="#269BA3"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        )}

        <DialogFooter className="flex justify-evenly">
          <DialogClose asChild>
            <Button type="submit" variant={"outline"}>
              Annuler annuler
            </Button>
          </DialogClose>
          <Button onClick={() => onConfirm(agentData)} type="submit">
            Mise à jour
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
