import moment from "moment";

interface TimeLineProps {
  bookingData: unknown;
}

export const TimeLine = ({ bookingData }: TimeLineProps) => {
  return (
    <div className="flex gap-x-3">
      <div className="w-16 text-end">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {moment(bookingData?.date).format("hh:mm A")}
        </span>
      </div>
      <div className="relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-gray-700">
        <div className="relative z-10 size-7 flex justify-center items-center">
          <div className="size-2 rounded-full bg-gray-400 dark:bg-gray-600"></div>
        </div>
      </div>
      <div className="grow pt-0.5 pb-8">
        <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
          Booking ID: {bookingData?.booking_id}
        </h3>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {bookingData?.address}
        </p>
        <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
          {bookingData?.first_name} {bookingData?.last_name}
        </h3>
        <h3 className="flex gap-x-1.5 font-semibold text-gray-800 dark:text-white">
          {bookingData?.phone_number}
        </h3>
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
  );
};
