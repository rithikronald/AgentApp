import { Header } from "@/components/custom/Header";
import { ReservationCompletedCard } from "@/components/custom/ReservationCompletedCard";
import { BASE_URL } from "@/utils/apiEndpoint";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BookingObjectType } from "./MyReservations";

export const CompletedReservations = () => {
  const navigate = useNavigate();
  const {
    state: { agent_id },
  } = useLocation();
  const [bookingsList, setBookingsList] = useState<BookingObjectType[]>([
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

  const getBookings = () => {
    axios
      .get(BASE_URL + `/agents/${agent_id}/bookings/completed`)
      .then((res) => {
        console.log("RESPONSE", res?.data);
      })
      .catch((err) => {
        console.log("ERROR: GET OTP", err);
        toast.error("Error sending Otp, Please try again.");
      });
  };

  return (
    <div className="flex flex-1 flex-col  md:h-[70%] md:w-[50%] md:items-center">
      <Header />
      <div className="flex flex-col mt-6">
        <p className="text-black font-semibold text-2xl text-center">
          Réservations complétées
        </p>
        {bookingsList?.map((item, index) => {
          return <ReservationCompletedCard bookingData={item} key={index} />;
        })}
      </div>
    </div>
  );
};
