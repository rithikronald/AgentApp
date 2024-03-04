import { Header } from "@/components/custom/Header";
import { MyReservationCard } from "@/components/custom/MyReservationCard";
import { BASE_URL } from "@/utils/apiEndpoint";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface ReservationDataObjectType {
  _id: string;
  address: string;
  thermostat_count: number;
  time_slot: number;
  phone_number: string;
  email: string;
  first_name: string;
  last_name: string;
  agent_info: {
    agent_id: string;
    agent_name: string;
    agent_phone: string;
  };
  rescheduled: false;
  date: string;
  created_date: string;
  latitude: number;
  longitude: number;
  distance: number;
}

export const MyReservations = () => {
  const navigate = useNavigate();
  const {
    state: { agent_id },
  } = useLocation();
  const [reservationData, setReservationData] = useState<
    ReservationDataObjectType[]
  >([
    {
      _id: "",
      address: "",
      thermostat_count: 0,
      time_slot: 0,
      phone_number: "",
      email: "",
      first_name: "",
      last_name: "",
      agent_info: {
        agent_id: "",
        agent_name: "",
        agent_phone: "",
      },
      rescheduled: false,
      date: "",
      created_date: "",
      latitude: 0,
      longitude: 0,
      distance: 0,
    },
  ]);

  const getReservations = () => {
    axios
      .get(BASE_URL + `/agents/${agent_id}/bookings`)
      .then((res) => {
        console.log("RESPONSE", res?.data);
        setReservationData(res?.data);
      })
      .catch((err) => {
        console.log("ERROR: GET OTP", err);
        toast.error("Error sending Otp, Please try again.");
      });
  };

  useEffect(() => {
    // if (agent_id) getReservations();
  }, [agent_id]);

  return (
    <div className="flex flex-1 flex-col  md:h-[70%] md:w-[50%] md:items-center">
      <Header />
      <div className="flex flex-col">
        <p className="text-black font-semibold text-2xl text-center">
          Mes Réservations
        </p>
        {reservationData &&
          reservationData?.map(
            (item: ReservationDataObjectType, index: number) => {
              return (
                <MyReservationCard
                  key={index}
                  data={item}
                  onClick={() => navigate("/reservation_details")}
                />
              );
            }
          )}
      </div>
    </div>
  );
};
