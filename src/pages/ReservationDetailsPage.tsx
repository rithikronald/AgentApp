import { Header } from "@/components/custom/Header";
import { MyReservationCard } from "@/components/custom/MyReservationCard";
import photo from "../assets/images/Image.png";
import { Button } from "@/components/ui/button";
import downloadImage from "../assets/images/downloadImage.png";
import completedImage from "../assets/images/completedImage.png";
import { useLocation, useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "@/utils/apiEndpoint";
import { toast } from "react-toastify";

export const ReservationDetailsPage = () => {
  const navigate = useNavigate();
  const {
    state: { bookingData },
  } = useLocation();
  const [images, setImages] = useState();
  const [isBookingCompleted, setIsBookingCompleted] = useState(false);

  const completeBooking = () => {
    console.log("IMAGES", images);
    const formData = new FormData();
    images?.forEach((image, index) => {
      const file = new File([image], image.name, { type: image.type });
      formData.append("image", file);
    });

    console.log("FORM DATA", formData);

    axios
      .put(
        BASE_URL + `/bookings/${bookingData?.booking_id}/complete`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        setIsBookingCompleted(true);
        console.log("RESPONSE: Complete Booking", res?.data);
        toast.success("Booking completed successfully");
      })
      .catch((err) => {
        console.log("ERROR: Complete Booking", err);
        toast.error("Something went wrong, please try again.");
      });
  };

  const validation = () => {
    if (images) {
      completeBooking();
    }
  };

  return (
    <div className="flex flex-1 flex-col  md:h-[70%] md:w-[50%] md:items-center">
      <Header />
      <div className="flex flex-col mt-6">
        <p className="text-black font-semibold text-2xl text-center">
          Numéro de réservation: 522558
        </p>
        <MyReservationCard data={bookingData} isDetailsPage={true} />
        {isBookingCompleted ? (
          <div className="flex flex-col mt-10 w-full rounded-xl items-center bg-[#F8FAFC] p-4 mb-10">
            <div className="flex w-full  items-center">
              <img src={downloadImage} className="w-12 h-12" />
              <div className="flex flex-col ml-2">
                {/* <p className="text-primary font-semibold">
                  Téléchargement réussi
                </p> */}
                <p className="text-primary font-semibold">
                  Les Images sont téléchargées avec succès.
                </p>
              </div>
            </div>
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
                    En attente de l'approbation de l'installation par le client
                  </p>
                  {/* <p className="text-primary font-light">
                    En attente de la vérification finale
                  </p> */}
                </div>
              </div>
              <Button
                onClick={() => navigate("/completed_reservations")}
                className="mt-6"
              >
                Next
              </Button>
              {/* <div className="flex w-full items-center">
                <img src={completedImage} className="w-10 h-10" />
                <div className="flex flex-col ml-3">
                  <p className="text-primary font-semibold">
                    Installation terminée!
                  </p>
                  <p className="text-primary font-light">
                    Numéro de réservation: 522558 est fermé.
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center mt-10">
            <img src={photo} className="w-[90px] h-[70px]" />
            <p className="text-black text-lg text-center">Ajouter des images</p>
            <div className="grid w-full max-w-sm items-center gap-1.5 my-3">
              <Input
                id="picture"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  console.log("-=========", e.target);
                  const { files } = e.target;
                  let imageArr = [];
                  for (let i = 0; i < files?.length; i++) {
                    const file = files?.[i]; // OR const file = files.item(i);
                    console.log("IMAGE", file);
                    imageArr.push(file);
                  }
                  setImages(imageArr);
                }}
              />
            </div>
            <p className="text-muted-foreground font-light">
              Taille maximale: 50MB
            </p>
            <Button onClick={validation} className="rounded-full mt-6 w-[90%]">
              Marquer l’installation comme complète
            </Button>
            {/* <Button className="mt-6">Importer des images</Button> */}
            {/* <button className="text-primary font-semibold">parcourir</button> */}
          </div>
        )}
      </div>
    </div>
  );
};
