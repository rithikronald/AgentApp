import { Header } from "@/components/custom/Header";
import { MyReservationCard } from "@/components/custom/MyReservationCard";
import photo from "../assets/images/Image.png";
import { Button } from "@/components/ui/button";
import downloadImage from "../assets/images/downloadImage.png";
import completedImage from "../assets/images/completedImage.png";
import { useNavigate } from "react-router-dom";

export const ReservationDetailsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 flex-col  md:h-[70%] md:w-[50%] md:items-center">
      <Header />
      <div className="flex flex-col mt-6">
        <p className="text-black font-semibold text-2xl text-center">
          Numéro de réservation: 522558
        </p>
        <MyReservationCard isDetailsPage={true} />
        <div className="flex flex-col items-center mt-10">
          <img src={photo} className="w-[90px] h-[70px]" />
          <p className="text-black text-lg text-center">
            Télécharger les images d’installation{" "}
            <button className="text-primary font-semibold">parcourir</button>
          </p>
          <p className="text-muted-foreground font-light">
            Taille maximale: 50MB
          </p>
        </div>
        <div className="flex flex-col mt-10 w-full rounded-xl items-center bg-[#F8FAFC] p-4 mb-10">
          <div className="flex w-full  items-center">
            <img src={downloadImage} className="w-12 h-12" />
            <div className="flex flex-col ml-2">
              <p className="text-primary font-semibold">
                Téléchargement réussi
              </p>
              <p className="text-primary font-semibold">
                Les Images sont téléchargées avec succès.
              </p>
            </div>
          </div>
          <Button
            onClick={() => navigate("/completed_reservations")}
            className="rounded-full mt-6 w-[90%]"
          >
            Marquer l’installation comme complète
          </Button>
          <div className="flex flex-col w-full mt-6 space-y-4">
            <div className="flex w-full items-center">
              <img src={completedImage} className="w-10 h-10" />
              <div className="flex flex-col ml-3">
                <p className="text-primary font-semibold">
                  Installation marquée avec succès terminée
                </p>
                <p className="text-primary font-light">
                  Les Images sont téléchargées avec succès.
                </p>
              </div>
            </div>
            <div className="flex w-full items-center">
              <img src={completedImage} className="w-10 h-10" />
              <div className="flex flex-col ml-3">
                <p className="text-primary font-semibold">
                  Installation approuvée par le client
                </p>
                <p className="text-primary font-light">
                  En attente de la vérification finale
                </p>
              </div>
            </div>
            <div className="flex w-full items-center">
              <img src={completedImage} className="w-10 h-10" />
              <div className="flex flex-col ml-3">
                <p className="text-primary font-semibold">
                  Installation terminée!
                </p>
                <p className="text-primary font-light">
                  Numéro de réservation: 522558 est fermé.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
