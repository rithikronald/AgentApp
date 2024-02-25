import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import logo from "./assets/images/logo.png";
import { Dashboard } from "./pages/Dashboard";
import { InstallationRequests } from "./pages/InstallationRequests";
import { LoginPage } from "./pages/LoginPage";
import { SignUpPage } from "./pages/SignUpPage";
import { SignUpVerification } from "./pages/SignUpVerification";
import { VerifyOtpPage } from "./pages/VerifyOtpPage";
import { MyReservations } from "./pages/MyReservations";
import { ReservationDetailsPage } from "./pages/ReservationDetailsPage";
import { CompletedReservations } from "./pages/CompletedReservations";
import { ProfilePage } from "./pages/ProfilePage";

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
    path: "/verify_registration",
    element: <SignUpVerification />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/installation_requests",
    element: <InstallationRequests />,
  },
  {
    path: "/my_reservations",
    element: <MyReservations />,
  },
  {
    path: "/reservation_details",
    element: <ReservationDetailsPage />,
  },
  {
    path: "/completed_reservations",
    element: <CompletedReservations />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
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
