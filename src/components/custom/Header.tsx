import { FaMapMarkerAlt } from "react-icons/fa";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="flex w-full justify-end items-end space-x-4">
      <div className="flex gap-x-2 items-center px-2 rounded-lg mt-3 border-2 border-primary">
        <FaMapMarkerAlt color="#269BA3" />
        <p className="text-lg">Paris</p>
      </div>
      <Button
        className="h-8"
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
      >
        Log Out
      </Button>
    </div>
  );
};
