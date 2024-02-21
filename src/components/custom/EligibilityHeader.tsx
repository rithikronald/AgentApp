import { IoArrowBack } from "react-icons/io5";

interface EligibilityHeaderProps {
  onBackPress: () => void;
}
export const EligibilityHeader = ({ onBackPress }: EligibilityHeaderProps) => {
  return (
    <div className="flex items-center w-full md:w-[60%]">
      <IoArrowBack onClick={onBackPress} size={30} color="#269BA3" />
      <div className="flex w-[90%] justify-center items-center">
        <p className="font-semibold text-3xl text-center">
          Test your eligibility
        </p>
      </div>
    </div>
  );
};
