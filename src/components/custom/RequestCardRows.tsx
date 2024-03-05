interface RequestCardRowsProps {
  title: string;
  value?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component?: any;
}

export const RequestCardRows = ({
  title,
  value,
  Component,
}: RequestCardRowsProps) => {
  return (
    <div className="flex flex-row gap-x-2 items-center">
      <p className="text-black font-normal font-semibold">{title}</p>
      {value && <p className="text-black font-normal">{value}</p>}
      {Component && Component}
    </div>
  );
};
