import { watt_connect_instance } from "@/App";
import { Header } from "@/components/custom/Header";
import { MyReservationCard } from "@/components/custom/MyReservationCard";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
  const [reservationData, setReservationData] = useState<BookingObjectType[]>();

  const getBookings = () => {
    watt_connect_instance
      .get(`/agents/${agent_id}/bookings`)
      .then((res) => {
        console.log("RESPONSE: agent bookings", res?.data);
        setReservationData(res?.data);
      })
      .catch((err) => {
        console.log("ERROR: agent bookings", err);
      });
  };

  useEffect(() => {
    if (agent_id) {
      getBookings();
    }
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
                showSwitch={true}
                data={item}
                agent_id={agent_id}
                onClick={() =>
                  navigate("/reservation_details", {
                    state: {
                      bookingData: item,
                    },
                  })
                }
              />
            );
          })}
      </div>
    </div>
  );
};
