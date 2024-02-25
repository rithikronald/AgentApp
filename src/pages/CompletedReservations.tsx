import { Header } from "@/components/custom/Header";
import { ReservationCompletedCard } from "@/components/custom/ReservationCompletedCard";

export const CompletedReservations = () => {
  return (
    <div className="flex flex-1 flex-col  md:h-[70%] md:w-[50%] md:items-center">
      <Header />
      <div className="flex flex-col mt-6">
        <p className="text-black font-semibold text-2xl text-center">
          Réservations complétées
        </p>
        <ReservationCompletedCard />
      </div>
    </div>
  );
};
