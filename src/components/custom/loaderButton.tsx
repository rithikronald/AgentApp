import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { Bars } from "react-loader-spinner";
import classnames from "classnames";

type LoaderButtonProps = ButtonProps & {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  onClick: () => void;
  type?: string;
};

export const LoaderButton = ({
  isLoading,
  children,
  className,
  onClick,
  type,
}: LoaderButtonProps) => {
  return (
    <Button
      onClick={onClick}
      type={type}
      className={className}
      disabled={isLoading}
    >
      {isLoading ? (
        <Bars
          height="14"
          width="14"
          color="#fff"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        children
      )}
    </Button>
  );
};
