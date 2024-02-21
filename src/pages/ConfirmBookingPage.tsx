import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import moment from "moment";
import { useEffect, useState } from "react";
import { UserDataInterface } from "./LandingPage";
import { slotMap } from "./DateSelectionPage";
import axios from "axios";
import { BASE_URL } from "@/apiEndPoint";
import { extractCountryCode } from "@/utils/helperfunction";
import { useNavigate, useNavigation } from "react-router-dom";

export const ConfirmBookingPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserDataInterface>();
  const [otp, setOtp] = useState();

  const createBooking = () => {
    const code = extractCountryCode(userData?.countryCode);
    const phone_number = `${code}${userData?.phone}`;
    // console.log("BODY : ", {
    //   address: `${userData?.address_1} ${userData?.address_2}`,
    //   thermostat_count: userData?.thermoStatQuantity,
    //   time_slot: userData?.slot,
    //   phone_number: phone_number,
    //   email: userData?.email,
    //   house_area: userData?.area,
    //   first_name: userData?.firstName,
    //   last_name: userData?.lastName,
    //   rescheduled: false,
    // });
    axios
      .post(BASE_URL + "/bookings/", {
        address: `${userData?.address_1} ${userData?.address_2}`,
        thermostat_count: userData?.thermoStatQuantity,
        time_slot: userData?.slot,
        phone_number: phone_number,
        email: userData?.email,
        house_area: userData?.area,
        first_name: userData?.firstName,
        last_name: userData?.lastName,
        rescheduled: false,
        created_date: userData?.created_date,
        date: userData?.date,
      })
      .then((res) => {
        console.log("RESPONSE: CREATE BOOKING", res?.data);
        navigate("/booking_status", { state: { status: res?.data } });
      })
      .catch((err) => {
        console.log("ERROR: CREATE BOOKING", err);
      });
  };

  const getOTP = (ph: string) => {
    axios
      .post(BASE_URL + "/verify/send-code/", {
        phone_number: ph,
      })
      .then((res) => {
        console.log("RESPONSE: GET OTP", res?.data);
      })
      .catch((err) => {
        console.log("ERROR: GET OTP", err);
      });
  };

  const verifyOTP = () => {
    if (otp && userData?.phone) {
      const code = extractCountryCode(userData?.countryCode);
      console.log("Code", code, userData?.phone);
      axios
        .post(BASE_URL + "/verify/check-code/", {
          phone_number: `${code}${userData?.phone}`,
          code: otp,
        })
        .then((res) => {
          console.log("RESPONSE: VERIFY OTP", res?.data);
          if (res?.data?.verified) {
            createBooking();
          }
        })
        .catch((err) => {
          console.log("ERROR: VERIFY OTP", err);
        });
    }
  };

  const getLocalData = async () => {
    const localData: UserDataInterface = await JSON.parse(
      localStorage.getItem("userData")
    );
    console.log("User Data", localData);
    if (localData?.phone) {
      let code = extractCountryCode(localData?.countryCode);
      console.log("Code", code, localData?.phone);
      getOTP(`${code}${localData?.phone}`);
    }
    setUserData(localData);
  };

  useEffect(() => {
    getLocalData();
  }, []);

  return (
    <div className="flex flex-1  flex-col justify-evenly items-center md:h-[70%]">
      <div className="flex flex-col md:w-[50%]">
        <p className="text-3xl text-center font-light">
          Your Booking is for the date
          <span className="text-3xl font-bold">
            {" "}
            {moment(userData?.date).format("L")}
          </span>
          , between{" "}
          <span className="text-3xl font-bold">{slotMap[userData?.slot]}</span>.
          Our technician will contact you before the visit for final
          confirmation.
        </p>
        <div className="flex items-center justify-center mt-14">
          <Input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="rounded-r-none focus-visible:ring-0"
            placeholder="Enter your OTP "
          />
          <Button
            onClick={() => verifyOTP()}
            className="rounded-l-none"
            type="submit"
          >
            Confirm your booking
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-4 text-center">
          A One Time Password (OTP) have been sent to your E-mail (
          {userData?.email}) and SMS {userData?.phone}. Enter the OTP to confirm
          booking
        </p>
      </div>
    </div>
  );
};
