import { Header } from "@/components/custom/Header";
import { TimeLine } from "@/components/custom/TimeLine";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-1 flex-col  md:h-[70%] md:w-[50%] md:items-center">
      <Header />
      <div className="flex flex-col mt-5">
        <p className="text-black font-semibold text-2xl">Accueil</p>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button
            onClick={() => navigate("/installation_requests")}
            className="flex h-16"
          >
            Demandes d’installation
          </Button>
          <Button
            onClick={() =>
              navigate("/my_reservations", {
                state: {
                  agent_id: "",
                },
              })
            }
            className="flex h-16"
          >
            Mes Réservations
          </Button>
          <Button
            onClick={() => navigate("/completed_reservations")}
            className="flex h-16"
          >
            Réservations complétées
          </Button>
          <Button onClick={() => navigate("/profile")} className="flex h-16">
            Profile
          </Button>
        </div>
      </div>
      <div className="flex flex-col mt-10">
        <p className="text-black font-semibold text-2xl">Horaire du jour</p>
        <div className="flex flex-col mt-4">
          <TimeLine />
          <TimeLine />
          <TimeLine />
          <TimeLine />
        </div>
      </div>
    </div>
  );
};
