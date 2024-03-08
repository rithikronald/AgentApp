import { Header } from "@/components/custom/Header";
import { ReservationCompletedCard } from "@/components/custom/ReservationCompletedCard";
import { BASE_URL } from "@/utils/apiEndpoint";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BookingObjectType } from "./MyReservations";

export const CompletedReservations = () => {
  const navigate = useNavigate();
  const [bookingsList, setBookingsList] = useState<BookingObjectType[]>();

  const getBookings = () => {
    const agent_id = localStorage.getItem("agentId");
    if (agent_id) {
      axios
        .get(BASE_URL + `/agents/${agent_id}/bookings/completed`)
        .then((res) => {
          console.log("RESPONSE: Completed Booking", res?.data);
        })
        .catch((err) => {
          console.log("ERROR: Completed Booking", err);
        });
    } else {
      toast.error("Agent not found, please try to login again");
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div className="flex flex-1 flex-col  md:h-[70%] md:w-[50%] md:items-center">
      <Header />
      <div className="flex flex-col mt-6">
        <p className="text-black font-semibold text-2xl text-center">
          Réservations complétées
        </p>
        {bookingsList ? (
          bookingsList?.map((item, index) => {
            return <ReservationCompletedCard bookingData={item} key={index} />;
          })
        ) : (
          <p className="text-black font-semibold text-lg mt-10">
            There are currently no booking that are completed.
          </p>
        )}
      </div>
    </div>
  );
};
