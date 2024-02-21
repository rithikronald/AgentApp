import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { Input } from "../ui/input";

interface CustomInputProps {
  className?: string;
  title: string;
  value: string;
  onChange: (val: string) => void;
}

export const CustomInput = ({
  className,
  title,
  value,
  onChange,
}: CustomInputProps) => {
  return (
    <div
      className={`flex w-[70%] items-center border-[#E5E7EB] rounded-lg px-2 py-1 border-[1px] ${className}`}
    >
      <div className="flex flex-col w-[90%]">
        <p className="text-muted-foreground text-xs">{title}</p>

        <Input
          value={value}
          onChange={(val) => onChange(val)}
          type="email"
          className="focus-visible:ring-0 p-0 h-6 border-0"
        />
      </div>
      <div className="flex ">
        <CiCirclePlus
          onClick={() => {
            const inc = Number(value) + 1;
            onChange(inc.toString());
          }}
          className="w-6 h-6"
        />
        <CiCircleMinus
          onClick={() => {
            if (Number(value) > 1) {
              const dec = Number(value) - 1;
              onChange(dec.toString());
            }
          }}
          className="w-6 h-6"
        />
      </div>
    </div>
  );
};
