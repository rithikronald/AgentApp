import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import logo from "./assets/images/logo.png";
import { AddressPage } from "./pages/AddressPage";
import { BookingStatusPage } from "./pages/BookingStatusPage";
import { ConfirmBookingPage } from "./pages/ConfirmBookingPage";
import { DateSelectionPage } from "./pages/DateSelectionPage";
import { EligibilityFlow } from "./pages/EligibilityFlow";
import { LoginPage } from "./pages/LoginPage";
import { ReschedulePage } from "./pages/ReschedulePage";
import { ThermostatPage } from "./pages/ThermostatPage";
import { VerifyOtpPage } from "./pages/VerifyOtpPage";
import { SignUpPage } from "./pages/SignUpPage";

const routes = [
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/verify_otp",
    element: <VerifyOtpPage />,
  },
  {
    path: "/register",
    element: <SignUpPage />,
  },
  {
    path: "/details",
    element: <ThermostatPage />,
  },
  {
    path: "/address",
    element: <AddressPage />,
  },
  {
    path: "/slot_selection",
    element: <DateSelectionPage />,
  },
  {
    path: "/confirm_booking",
    element: <ConfirmBookingPage />,
  },
  {
    path: "/booking_status",
    element: <BookingStatusPage />,
  },
  {
    path: "/eligibility_check",
    element: <EligibilityFlow />,
  },
  {
    path: "/reschedule_booking",
    element: <ReschedulePage />,
  },
];

const makeRoutes = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <Suspense fallback={<div data-stage></div>}>
              {route.element}
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
};

function App() {
  return (
    <div className="flex flex-1 flex-col w-full h-[100vh] p-4">
      <div className="flex justify-between bg-[#E2E8F0] h-18 py-2 rounded-lg px-4">
        <div className="flex">
          <img src={logo} className="h-[25px]" />
        </div>
      </div>
      <div className="flex flex-1"> {makeRoutes()} </div>
    </div>
  );
}

export default App;
