import { watt_connect_instance } from "@/App";
import { Header } from "@/components/custom/Header";
import { InstallationDetailsCard } from "@/components/custom/InstallationDetailsCard";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BookingObjectType } from "./MyReservations";

export const InstallationRequests = () => {
  const {
    state: { agent_id },
  } = useLocation();
  const [bookingsList, setBookingsList] = useState<BookingObjectType[]>();

  const getBooking = () => {
    watt_connect_instance
      .get(`/agents/${agent_id}/find_bookings`)
      .then((res) => {
        console.log("RESPONSE: find bookings", res?.data);
        setBookingsList(res?.data);
      })
      .catch((err) => {
        console.log("ERROR: find bookings", err);
      });
  };

  useEffect(() => {
    getBooking();
    console.log("agent id", agent_id);
  }, []);

  return (
    <div className="flex flex-1 flex-col  md:h-[70%] md:w-[50%] md:items-center">
      <Header />
      <div className="flex flex-col items-center">
        <p className="text-black font-semibold text-2xl">
          Demandes d’installation
        </p>
        <div className="flex flex-col space-y-4 mt-5">
          {bookingsList && bookingsList?.length > 0 ? (
            bookingsList?.map((item, index) => {
              return (
                <InstallationDetailsCard
                  key={index}
                  bookingData={item}
                  onConfirmBooking={getBooking}
                />
              );
            })
          ) : (
            <p className="text-black font-semibold text-lg">
              There are currently no booking available
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
