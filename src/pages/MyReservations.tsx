import { Header } from "@/components/custom/Header";
import { MyReservationCard } from "@/components/custom/MyReservationCard";
import { useNavigate } from "react-router-dom";

export const MyReservations = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-1 flex-col  md:h-[70%] md:w-[50%] md:items-center">
      <Header />
      <div className="flex flex-col">
        <p className="text-black font-semibold text-2xl text-center">
          Mes Réservations
        </p>
        <MyReservationCard onClick={() => navigate("/reservation_details")} />
      </div>
    </div>
  );
};
