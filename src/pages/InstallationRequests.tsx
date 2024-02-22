import { Header } from "@/components/custom/Header";
import { InstallationDetailsCard } from "@/components/custom/InstallationDetailsCard";
import { RequestCardRows } from "@/components/custom/RequestCardRows";
import { Button } from "@/components/ui/button";

export const InstallationRequests = () => {
  return (
    <div className="flex flex-1 flex-col  md:h-[70%] md:w-[50%] md:items-center">
      <Header />
      <div className="flex flex-col">
        <p className="text-black font-semibold text-2xl">
          Demandes d’installation
        </p>
        <div className="flex flex-col space-y-4 mt-5">
          <InstallationDetailsCard />
          <InstallationDetailsCard />
        </div>
      </div>
    </div>
  );
};
