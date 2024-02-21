import { BASE_URL } from "@/apiEndPoint";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export interface UserDataInterface {
  firstName: string;
  lastName: string;
  thermoStatQuantity: number;
  area: number;
  address_1: string;
  address_2: string;
  city: string;
  postalCode: string;
  email: string;
  phone: string;
  date: Date;
  slot: number;
  countryCode: string;
  created_date: string;
}

export const LandingPage = () => {
  const navigate = useNavigate();
  const [bookingId, setBookingId] = useState();

  const getBookingDetails = () => {
    axios
      .get(BASE_URL + `/bookings/${Number(bookingId)}`)
      .then((res) => {
        console.log("RESPONSE: GET BOOKING DETAILS", res?.data);
        navigate("/booking_status", { state: { status: res?.data } });
      })
      .catch((err) => {
        console.log("ERROR: GET BOOKING DETAILS", err);
      });
  };

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="flex flex-1 h-[90%] flex-col justify-evenly items-center md:h-[70%]">
      <p className="flex font-semibold text-3xl">Start your Booking</p>
      <Button
        onClick={() => {
          localStorage.setItem(
            "userData",
            JSON.stringify({
              firstName: "",
              lastName: "",
              thermoStatQuantity: 1,
              area: 1,
              address_1: "",
              address_2: "",
              city: "",
              postalCode: "",
              email: "",
              phone: "",
              date: new Date(),
              slot: "",
              created_date: "",
            })
          );
          navigate("/eligibility_check");
        }}
        className="rounded-full px-20"
      >
        Check My Eligibility
      </Button>
      <div className="flex flex-col items-center justify-center">
        <p className="flex text-2xl font-semibold">
          Check your existing booking status
        </p>
        <div className="flex w-full items-center mt-6">
          <Input
            placeholder="Enter your Booking ID"
            className="rounded-r-none"
            value={bookingId}
            onChange={(e) => setBookingId(e.target.value)}
          />
          <Button
            onClick={getBookingDetails}
            type="submit"
            className="rounded-l-none"
          >
            Track my booking
          </Button>
        </div>
        <p className="text-muted-foreground text-sm mt-4">
          Your booking ID have been sent in the Email and SMS at the time of
          your booking
        </p>
      </div>
    </div>
  );
};
