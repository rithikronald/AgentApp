import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataInterface } from "./LandingPage";

export const slotMap = [
  "09:00 a.m - 11:00 a.m",
  "11:00 a.m - 01:00 p.m",
  "02:00 p.m - 04:00 p.m",
  "04:00 p.m - 06:00 p.m",
];

export const DateSelectionPage = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState();

  const getLocalData = async () => {
    const userData = await JSON.parse(localStorage.getItem("userData"));
    if (userData.date && userData?.slot) {
      setDate(new Date(userData?.date));
      setSelectedSlot(userData?.slot);
    }
    console.log("USER DATA", userData);
  };

  useEffect(() => {
    getLocalData();
    // localStorage.clear()
  }, []);

  const validation = async () => {
    if (date && selectedSlot !== null) {
      let userData: UserDataInterface = await JSON.parse(
        localStorage.getItem("userData")
      );
      userData = {
        ...userData,
        date: date,
        slot: selectedSlot,
        created_date: new Date().toISOString(),
      };
      await localStorage.setItem("userData", JSON.stringify(userData));
      navigate("/confirm_booking");
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-evenly items-center">
      <p className="flex text-2xl font-semibold mt-10">
        Check your existing booking status
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
