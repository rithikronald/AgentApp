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
  const [todaysBookingList, setTodaysBookingList] = useState([
    {
      _id: "s65e5dd254c22eb272347723e",
      booking_id: "65976",
      address: "Chennai",
      thermostat_count: 3,
      time_slot: 4,
      phone_number: "+9198348839475",
      email: "pal@gmail.com",
      first_name: "pal",
      last_name: "manikam",
      agent_info: {
        agent_id: "65e5dbca4c22eb272347723c",
        agent_name: "pradeep kumar",
        agent_phone: "+919839456738",
      },
      rescheduled: false,
      date: "2024-03-04T14:39:22.039Z",
      created_date: "2024-03-04T14:39:22.039Z",
      latitude: 13.0836939,
      longitude: 80.270186,
      distance: null,
    },
  ]);

  const getTodaysBooking = () => {
    axios
      .get(
        BASE_URL + "/agents/65e5dbca4c22eb272347723c/bookings/assigned/today"
      )
      .then((res) => {
        console.log("RESPONSE", res?.data);
      })
      .catch((err) => {
        console.log("ERROR: GET OTP", err);
        toast.error("Error sending Otp, Please try again.");
        setIsLoading(false);
      });
  };

  // useEffect(() => {
  //   getTodaysBooking();
  // }, []);

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
                  agent_id: "",
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
          {todaysBookingList?.map((item, index) => {
            return <TimeLine key={index} bookingData={item} />;
          })}
        </div>
      </div>
    </div>
  );
};
