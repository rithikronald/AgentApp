import { BookingObjectType } from "@/pages/MyReservations";
import { slotMapping } from "@/utils/constants/data";
import moment from "moment";
import { RequestCardRows } from "./RequestCardRows";
import StarRatingComponent from "react-star-rating-component";

interface ReservationCompletedCardProps {
  bookingData: BookingObjectType;
}

export const ReservationCompletedCard = ({
  bookingData,
}: ReservationCompletedCardProps) => {
  return (
    <div className="flex flex-col space-y-4 mt-5">
      <div className="flex flex-col rounded-xl bg-[#F8FAFC] p-2">
        <div className="flex flex-col space-y-2">
          <RequestCardRows
            title="Numéro de réservation:"
            value={bookingData?.booking_id}
          />
          <RequestCardRows
            title="Fente:"
            value={`${moment(bookingData?.date).format("L")} ${
              slotMapping[bookingData?.time_slot]
            }`}
          />
          <RequestCardRows
            title="Non. De ̦thermostats:"
            value={bookingData?.thermostat_count?.toString()}
          />
          <RequestCardRows
            title="Nom:"
            value={`${bookingData?.first_name} ${bookingData?.last_name}`}
          />
          <RequestCardRows title="Adresse:" value={bookingData?.address} />
          <RequestCardRows title="Contact:" value={bookingData?.phone_number} />
          <RequestCardRows title="Statut:" value="terminé" />
          <RequestCardRows
            title="Évaluation:"
            Component={
              <StarRatingComponent
                name="rate1"
                starCount={5}
                value={4}
                onStarClick={() => {}}
              />
            }
          />
          <RequestCardRows
            title="Statut du paiement:"
            value="payé, en attente, contacter le Support"
          />
        </div>
      </div>
    </div>
  );
};
