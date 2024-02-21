import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { slotMap } from "./DateSelectionPage";
import { Rating } from "react-simple-star-rating";
import axios from "axios";
import { BASE_URL } from "@/apiEndPoint";
import moment from "moment";

export const BookingStatusPage = () => {
  const navigate = useNavigate();
  const [statusData, setStatusData] = useState();
  const { state } = useLocation();

  useEffect(() => {
    console.log("STATUS", state?.status);
    if (state?.status) {
      setStatusData(state?.status);
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <p className="flex font-semibold text-3xl mt-10">Booking Status</p>
      <div className="flex flex-col w-full  mt-16 md:w-[50%]">
        {statusData && (
          <>
            <div className="flex gap-x-3">
              <div className="w-16 text-end">
                {/* <span className="text-xs text-gray-500 dark:text-gray-400">
                  12:05PM
                </span> */}
              </div>
              <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-gray-700">
                <div className="relative z-10 size-7 flex justify-center items-center">
                  <div className="size-2 rounded-full bg-gray-400 dark:bg-gray-600"></div>
                </div>
              </div>
              <div className="grow pt-0.5 pb-8">
                <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                  Your Booking is successfully created
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {moment(statusData?.date).format("ll")}, between{" "}
                  {slotMap?.[statusData?.time_slot]} a technician will be
                  assigned shortly. If you wish to reschedule for another time{" "}
                  <button
                    onClick={() => {
                      navigate("/reschedule_booking", {
                        state: { id: statusData?.booking_id },
                      });
                    }}
                    className="text-primary underline"
                  >
                    click here
                  </button>
                </p>
                {/* <button
              type="button"
              className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              <img
                className="flex-shrink-0 size-4 rounded-full"
                src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                alt="Image Description"
              />
              James Collins
            </button> */}
              </div>
            </div>
            {statusData.status == 1 || statusData.status == 2 ? (
              <div className="flex gap-x-3">
                <div className="w-16 text-end">
                  {/* <span className="text-xs text-gray-500 dark:text-gray-400">
                    12:05PM
                  </span> */}
                </div>
                <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-gray-700">
                  <div className="relative z-10 size-7 flex justify-center items-center">
                    <div className="size-2 rounded-full bg-gray-400 dark:bg-gray-600"></div>
                  </div>
                </div>
                <div className="grow pt-0.5 pb-8">
                  <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                    Agent Assigned for your Booking
                  </h3>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    A Technician is assigned for your booking. Your technician
                    is
                    {statusData.agent_name}, Contact: +33 948 4983.{" "}
                    {statusData.agent_name} will get in touch with you on the
                    day of your appointment. If you wish to reschedule for
                    another time click here
                  </p>
                  {/* <button
              type="button"
              className="mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
            >
              <img
                className="flex-shrink-0 size-4 rounded-full"
                src="https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8auto=format&fit=facearea&facepad=3&w=320&h=320&q=80"
                alt="Image Description"
              />
              James Collins
            </button> */}
                </div>
              </div>
            ) : null}
            {statusData.status == 2 && (
              <div className="flex gap-x-3">
                <div className=" text-end">
                  {/* <span className="text-xs text-gray-500 dark:text-gray-400">
                    12:05PM
                  </span> */}
                </div>
                <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-gray-700">
                  <div className="relative z-10 size-7 flex justify-center items-center">
                    <div className="size-2 rounded-full bg-gray-400 dark:bg-gray-600"></div>
                  </div>
                </div>
                <div className="grow pt-0.5 pb-8">
                  <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
                    Technician has marked the installation complete.
                  </h3>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* <div className="flex  flex-row">
        <Rating
          size={50}
          transition
          onClick={(val) => {
            console.log("VALUE", val);
          }}
        />
      </div> */}
    </div>
  );
};
