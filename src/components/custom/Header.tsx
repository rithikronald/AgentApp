import { FaMapMarkerAlt } from "react-icons/fa";

export const Header = () => {
  return (
    <div className="flex w-full justify-end items-end">
      <div className="flex gap-x-2 items-center px-2 rounded-lg mt-3 border-2 border-primary">
        <FaMapMarkerAlt color="#269BA3" />
        <p className="text-lg">Paris</p>
      </div>
    </div>
  );
};
