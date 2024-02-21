import { Calendar } from "@/components/ui/calendar";
import moment from "moment";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { slotMap } from "./DateSelectionPage";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { BASE_URL } from "@/apiEndPoint";

export const ReschedulePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const [date, setDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState();

  const rescheduleBooking = () => {
    axios
      .put(BASE_URL + `/bookings/${Number(state.id)}/reschedule`, {
        date: date.toString(),
        time_slot: selectedSlot,
        rescheduled: true,
      })
      .then((res) => {
        console.log("RESPONSE: RESCHEDULE BOOKING", res?.data);
        navigate("/booking_status", { state: { status: res?.data } });
      })
      .catch((err) => {
        console.log("ERROR: RESCHEDULE BOOKING", err);
      });
  };

  const validation = async () => {
    if (date && selectedSlot !== null && state?.id) {
      rescheduleBooking();
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-evenly items-center">
      <p className="flex text-2xl font-semibold mt-10">
        Reschedule your booking
      </p>
      {date && (
        <p className="text-3xl font-bold mt-6">{moment(date).format("ll")}</p>
      )}
      <Calendar
        mode="single"
        selected={date}
        onSelect={(val) => {
          console.log("DATE--", val);
          setDate(val);
        }}
        className="rounded-md border"
      />
      <div className="flex flex-col items-center mt-10 md:flex-row">
        <p className="flex text-lg font-semibold mr-4">Select Slot</p>
        <div className="flex mt-4 flex-row flex-wrap justify-between md:mt-0 md:gap-x-1">
          {slotMap.map((item, index) => {
            return (
              <Button
                variant={"outline"}
                key={index}
                onClick={() => setSelectedSlot(index)}
                className={`flex px-3 py-2 mt-2 border-input border-[1px] rounded-lg ${
                  selectedSlot == index && "ring-2 ring-primary "
                } md:mt-0`}
              >
                {item}
              </Button>
            );
          })}
        </div>
      </div>
      <Button onClick={validation} className="w-[200px] mt-10" type="submit">
        Next
      </Button>
    </div>
  );
};
