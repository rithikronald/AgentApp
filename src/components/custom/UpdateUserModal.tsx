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
import { toast } from "react-toastify";

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

  function validatePhoneNumber(phoneNumber) {
    // Regular expression to match the format +XXXXXXXXXX
    var regex = /^\+\d{10,}$/;

    // Check if the phone number matches the regular expression
    if (regex.test(phoneNumber)) {
      return true; // Valid phone number
    } else {
      return false; // Invalid phone number
    }
  }

  useEffect(() => {
    setAgentDetails(agentData);
    console.log("Agent Data", agentData);
  }, [agentData]);

  const handleChange = (fieldName: string, val: string) => {
    setAgentDetails((prev) => {
      let temp = {
        ...prev,
        [fieldName]: val,
      };
      return temp;
    });
  };

  const validation = () => {
    if (agentData?.phone != agentDetails?.phone) {
      if (validatePhoneNumber(agentDetails.phone)) {
        onConfirm({ ...agentDetails, new_phone: agentDetails?.phone });
      } else {
        toast.error("s'il vous plaît entrer un numéro de téléphone valide");
      }
    } else {
      onConfirm(agentDetails);
    }
  };

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
                  handleChange("first_name", e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm">Prénom</p>
              <Input
                value={agentDetails?.last_name}
                onChange={(e) => {
                  handleChange("last_name", e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm">Zone de Service</p>
              <Input
                value={agentDetails?.service_area}
                onChange={(e) => {
                  handleChange("service_area", e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm">Contact</p>
              <Input
                value={agentDetails?.phone}
                onChange={(e) => {
                  handleChange("phone", e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm">Numéro de compte</p>
              <Input
                value={agentDetails?.account_no}
                onChange={(e) => {
                  handleChange("account_no", e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm">Code de la branche</p>
              <Input
                value={agentDetails?.branch_code}
                onChange={(e) => {
                  handleChange("branch_code", e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p className="text-sm">Nom de la banque</p>
              <Input
                value={agentDetails?.bank_name}
                onChange={(e) => {
                  handleChange("bank_name", e.target.value);
                }}
              />
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
            <Button variant={"outline"}>Annuler annuler</Button>
          </DialogClose>
          <Button onClick={validation}>Mise à jour</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
