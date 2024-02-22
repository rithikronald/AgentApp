import { Header } from "@/components/custom/Header";
import { MyReservationCard } from "@/components/custom/MyReservationCard";
import photo from "../assets/images/Image.png";
import { Button } from "@/components/ui/button";

export const ReservationDetailsPage = () => {
  return (
    <div className="flex flex-1 flex-col  md:h-[70%] md:w-[50%] md:items-center">
      <Header />
      <div className="flex flex-col mt-6">
        <p className="text-black font-semibold text-2xl text-center">
          Numéro de réservation: 522558
        </p>
        <MyReservationCard isDetailsPage={true} />
        <div className="flex flex-col items-center mt-6">
          <img src={photo} className="w-[90px] h-[70px]" />
          <p className="text-black text-lg text-center">
            Télécharger les images d’installation{" "}
            <button className="text-primary font-semibold">parcourir</button>
          </p>
          <p className="text-muted-foreground font-light">
            Taille maximale: 50MB
          </p>
        </div>
      </div>
    </div>
  );
};
