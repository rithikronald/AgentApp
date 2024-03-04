import { Header } from "@/components/custom/Header";
import { MyReservationCard } from "@/components/custom/MyReservationCard";
import { BASE_URL } from "@/utils/apiEndpoint";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface BookingObjectType {
  _id: string;
  booking_id: string;
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
  distance: number | null;
}

export const MyReservations = () => {
  const navigate = useNavigate();
  const {
    state: { agent_id },
  } = useLocation();
  const [reservationData, setReservationData] = useState<BookingObjectType[]>([
    {
      _id: "s65e5dd254c22eb272347723e",
      booking_id: "65976",
      address: "Chennai",
      thermostat_count: 3,
      time_slot: 3,
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
          reservationData?.map((item: BookingObjectType, index: number) => {
            return (
              <MyReservationCard
                key={index}
                data={item}
                onClick={() => navigate("/reservation_details")}
              />
            );
          })}
      </div>
    </div>
  );
};
