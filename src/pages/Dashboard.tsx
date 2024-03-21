import { watt_connect_instance } from "@/App";
import { Header } from "@/components/custom/Header";
import { TimeLine } from "@/components/custom/TimeLine";
import { Button } from "@/components/ui/button";
import { fetchCity } from "@/utils/helperfunction";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  // const [agentId, setAgentId] = useState("65e5dbca4c22eb272347723c");
  const [agentId, setAgentId] = useState("");
  const [todaysBookingList, setTodaysBookingList] = useState([]);

  const getTodaysBooking = (id: string) => {
    watt_connect_instance
      .get(`/agents/${id}/bookings/assigned/today`)
      .then((res) => {
        console.log("RESPONSE: todays bookings", res?.data);
        setTodaysBookingList(res?.data);
      })
      .catch((err) => {
        console.log("ERROR: GET TodaysBooking", err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const id = localStorage.getItem("agent_id");
    if (id) {
      setAgentId(id);
      getTodaysBooking(id);
    } else {
      toast.error("Agent introuvable, veuillez réessayer de vous connecter");
    }
  }, []);

  return (
    <div className="flex flex-1 flex-col  md:h-[70%] md:w-[50%] md:items-center">
      <Header />
      <div className="flex flex-col mt-5">
        <p className="text-black font-semibold text-2xl">Accueil</p>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <Button
            onClick={() =>
              navigate("/installation_requests", {
                state: {
                  agent_id: agentId,
                },
              })
            }
            className="flex h-16"
          >
            Demandes d’installation
          </Button>
          <Button
            onClick={() =>
              navigate("/my_reservations", {
                state: {
                  agent_id: agentId,
                },
              })
            }
            className="flex h-16"
          >
            Mes Réservations
          </Button>
          <Button
            onClick={() =>
              navigate("/completed_reservations", {
                state: {
                  agent_id: agentId,
                },
              })
            }
            className="flex h-16"
          >
            Réservations complétées
          </Button>
          <Button onClick={() => navigate("/profile")} className="flex h-16">
            Profil
          </Button>
        </div>
      </div>
      <div className="flex flex-col mt-10">
        <p className="text-black font-semibold text-2xl">Horaire du jour</p>
        <div className="flex flex-col mt-4">
          {todaysBookingList.length > 0 ? (
            todaysBookingList?.map((item, index) => {
              return <TimeLine key={index} bookingData={item} />;
            })
          ) : (
            <p className="text-black font-semibold text-lg">
              Aucune réservation n'est assignée pour aujourd'hui
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
