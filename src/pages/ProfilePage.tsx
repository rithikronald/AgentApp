import { Header } from "@/components/custom/Header";
import { RequestCardRows } from "@/components/custom/RequestCardRows";
import { Button } from "@/components/ui/button";
import { FaRegEdit } from "react-icons/fa";

export const ProfilePage = () => {
  return (
    <div className="flex flex-1 flex-col  md:h-[70%] md:w-[50%] md:items-center">
      <Header />
      <div className="flex flex-col mt-6">
        <div className="flex flex-row justify-between items-center">
          <p className="text-black font-semibold">Renseignements personnels</p>
          <Button className="h-6 rounded-full">
            <FaRegEdit />
            <p className="ml-2">Edit</p>
          </Button>
        </div>
        <div className="flex flex-col w-full bg-[#F8FAFC] rounded-xl p-3 mt-4">
          <RequestCardRows title="Numéro de l’agent:" value="522558" />
          <RequestCardRows title="Nom:" value="Edine Wilson" />
          <RequestCardRows title="Zone de Service:" value="Paris" />
          <RequestCardRows title="Contact:" value="+33 58 85 55 22" />
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
        <div className="flex flex-col mt-4">
          <div className="flex flex-row justify-between items-center">
            <p className="text-black font-semibold">Coordonnées bancaires</p>
            <Button className="h-6 rounded-full">
              <FaRegEdit />
              <p className="ml-2">Edit</p>
            </Button>
          </div>
          <div className="flex flex-col w-full bg-[#F8FAFC] rounded-xl p-3 mt-4">
            <RequestCardRows title="N ° de compte:" value="58858484" />
            <RequestCardRows title="Code de la succursale:" value="97869" />
            <RequestCardRows title="Nom de la banque:" value="BNP Paribas" />
          </div>
        </div>
        <Button className="rounded-full mt-8 w-[80%] self-center mb-10">
          Se déconnecter
        </Button>
      </div>
    </div>
  );
};
