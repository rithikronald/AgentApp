interface RequestCardRowsProps {
  title: string;
  value: string;
}

export const RequestCardRows = ({ title, value }: RequestCardRowsProps) => {
  return (
    <div className="flex flex-row gap-x-2 items-center">
      <p className="text-black font-normal font-semibold">{title}</p>
      <p className="text-black font-normal">{value}</p>
    </div>
  );
};
