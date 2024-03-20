import { watt_connect_instance } from "@/App";
import { Header } from "@/components/custom/Header";
import { RequestCardRows } from "@/components/custom/RequestCardRows";
import { UpdateUserModal } from "@/components/custom/UpdateUserModal";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { toast } from "react-toastify";

export const ProfilePage = () => {
  const [agentDetails, setAgentDetails] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getBooking = () => {
    const agent_id = localStorage.getItem("agent_id");
    if (agent_id) {
      watt_connect_instance
        .get(`/agents/${agent_id}`)
        .then((res) => {
          console.log("RESPONSE: get Agent details", res?.data);
          setAgentDetails(res?.data);
        })
        .catch((err) => {
          console.log("ERROR: get Agent details", err);
        });
    } else {
      toast.error("Agent not found, please try to login again");
    }
  };

  const updateAgent = (data: unknown) => {
    const agent_id = localStorage.getItem("agent_id");
    if (agent_id) {
      watt_connect_instance
        .put(`/agents/${agent_id}/update`, data)
        .then((res) => {
          console.log("RESPONSE: update Agent details", res?.data);
        })
        .catch((err) => {
          console.log("ERROR: update Agent details", err);
        });
    } else {
      toast.error("Agent not found, please try to login again");
    }
  };

  useEffect(() => {
    getBooking();
  }, []);

  return (
    <div className="flex flex-1 flex-col  md:h-[70%] md:w-[50%] md:items-center">
      <Header />
      <div className="flex flex-col mt-6">
        <div className="flex flex-row justify-between items-center">
          <p className="text-black font-semibold">Renseignements personnels</p>
          <Button
            className="h-6 rounded-full"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            <FaRegEdit />
            <p className="ml-2">Edit</p>
          </Button>
        </div>
        <div className="flex flex-col w-full bg-[#F8FAFC] rounded-xl p-3 mt-4">
          <RequestCardRows
            title="Numéro de l’agent:"
            value={localStorage.getItem("agent_id") || "NAN"}
          />
          <RequestCardRows
            title="Nom:"
            value={`${agentDetails?.first_name} ${agentDetails?.last_name}`}
          />
          <RequestCardRows
            title="Zone de Service:"
            value={agentDetails?.service_area}
          />
          <RequestCardRows title="Contact:" value={agentDetails?.phone} />
        </div>
        <div className="flex flex-col mt-4">
          <div className="flex flex-row justify-between items-center">
            <p className="text-black font-semibold">Coordonnées bancaires</p>
            <Button
              className="h-6 rounded-full"
              onClick={() => {
                setIsModalOpen(true);
              }}
            >
              <FaRegEdit />
              <p className="ml-2">Edit</p>
            </Button>
          </div>
          <div className="flex flex-col w-full bg-[#F8FAFC] rounded-xl p-3 mt-4">
            <RequestCardRows
              title="Numéro de compte:"
              value={agentDetails?.account_no}
            />
            <RequestCardRows
              title="Code de la branche:"
              value={agentDetails?.branch_code}
            />
            <RequestCardRows
              title="Nom de la banque:"
              value={agentDetails?.bank_name}
            />
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-black font-semibold">Stock Stock</p>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-black font-semibold">
            Installations Installations
          </p>
          <div className="flex flex-col w-full bg-[#F8FAFC] rounded-xl p-3 mt-4">
            <RequestCardRows title="Installation totale effectuée:" value="5" />
            <RequestCardRows title="Note moyenne:" value="3.85" />
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <p className="text-black font-semibold">Les paiements</p>
          <div className="flex flex-col w-full bg-[#F8FAFC] rounded-xl p-3 mt-4">
            <RequestCardRows title="Paiement reçu:" value="58€" />
            <RequestCardRows title="Paiement en cours:" value="Nill" />
          </div>
        </div>
        <Button className="rounded-full mt-8 w-[80%] self-center mb-10">
          Se déconnecter
        </Button>
      </div>
      <UpdateUserModal
        openModal={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        agentData={agentDetails}
        onConfirm={(val) => {
          console.log("FINAL DATA", val);
          updateAgent(val);
        }}
      />
    </div>
  );
};
