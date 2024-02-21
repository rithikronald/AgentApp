import { Button } from "../ui/button";

interface EligibilityContentProps {
  question: string;
  onYesClick: () => void;
  onNoClick: () => void;
  button1Text: string;
  button2Text: string;
}

export const EligibilityContent = ({
  onNoClick,
  onYesClick,
  question,
  button1Text,
  button2Text,
}: EligibilityContentProps) => {
  return (
    <div className="flex flex-col">
      <p className="text-xl font-light">{question}</p>
      <div className="flex flex-col gap-y-4 mt-6">
        <Button onClick={onYesClick} variant={"outline"}>
          {button1Text}
        </Button>
        <Button onClick={onNoClick} variant={"outline"}>
          {button2Text}
        </Button>
      </div>
    </div>
  );
};
