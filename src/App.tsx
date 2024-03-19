import { Suspense, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { BASE_URL } from "./utils/apiEndpoint";
import { Bars } from "react-loader-spinner";

export const watt_connect_instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const routes = [
  {
    path: "/login",
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
    path: "/",
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
              <ToastContainer />
              {route.element}
            </Suspense>
          }
        />
      ))}
    </Routes>
  );
};

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  async function onAuthStateChanged(token: string) {
    if (token) {
      console.log("Token", token);
      console.log("Agent Id", localStorage.getItem("agent_id"));
      watt_connect_instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
      // navigate("/");
      setIsLoading(false);
    } else {
      navigate("/login");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    onAuthStateChanged(token);
  }, []);

  return (
    <div className="flex flex-1 flex-col w-full h-[100vh] p-4">
      <div className="flex justify-between bg-[#E2E8F0] h-18 py-2 rounded-lg px-4">
        <div className="flex">
          <img src={logo} className="h-[25px]" />
        </div>
      </div>

      <div className="flex flex-1">
        {!isLoading ? (
          makeRoutes()
        ) : (
          <div className="flex flex-col w-full h-[100vh] items-center justify-center">
            <Bars
              height="40"
              width="40"
              color="#269BA3"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
            <p className="text-black mt-3 ml-2">Loading... </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
