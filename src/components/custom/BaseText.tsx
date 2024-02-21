import React from "react";

interface BaseTextProps {
  text: string;
}

export const BaseText = ({ text }: BaseTextProps) => {
  return (
    <div className="flex flex-col">
      <p className="text-xl font-light">{text}</p>
    </div>
  );
};
