import { Header } from "@/components/custom/Header";
import { TimeLine } from "@/components/custom/TimeLine";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/utils/apiEndpoint";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [agentId, setAgentId] = useState("65e5dbca4c22eb272347723c");
  const [todaysBookingList, setTodaysBookingList] = useState();

  const getTodaysBooking = () => {
    axios
      .get(BASE_URL + `/agents/${agentId}/bookings/assigned/today`)
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
    localStorage.setItem("agentId", agentId);
    getTodaysBooking();
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
            Profile
          </Button>
        </div>
      </div>
      <div className="flex flex-col mt-10">
        <p className="text-black font-semibold text-2xl">Horaire du jour</p>
        <div className="flex flex-col mt-4">
          {todaysBookingList ? (
            todaysBookingList?.map((item, index) => {
              return <TimeLine key={index} bookingData={item} />;
            })
          ) : (
            <p className="text-black font-semibold text-lg">
              There are no booking assigned for today
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
